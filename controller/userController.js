import userModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// import springedge from 'springedge';




function generateOTP() { 
    let digits = '0123456789'; 
    let OTP = ''; 
    let len = digits.length 
    for (let i = 0; i < 4; i++) { 
        OTP += digits[Math.floor(Math.random() * len)]; 
    } 
     
    return OTP; 
}

export async function verifyUser(req, res, next){
    try {
        const {username} = req.method == "GET" ? req.query : req.body;

        let exist = await userModel.findOne({username});
        if(!exist) return res.status(404).send({error: "can't find user"});
        next();
    } catch (error) {
        return res.status(500).send({ error: "Authentication error" });
    }
}

// export async function register(req, res) {
//     try {
//         const { username, password, email, mobile, firstName, lastName, profile, gender } = req.body;

//         const existingUser = await userModel.findOne({ username }).exec();
//         const existingEmail = await userModel.findOne({ email }).exec();
//         const existingMobile = await userModel.findOne({ mobile }).exec();
//         const otp = generateOTP()

//         if (existingUser) {
//             res.status(400).send({ error: "Please use a unique username." });
//         }

//         if (existingEmail) {
//             res.status(400).send({ error: "Please use a unique email." });
//         }

//         if (existingMobile) {
//             res.status(400).send({ error: "Mobile number already exists" });
//         }

//         let params = {
//           sender: "SEDEMO",
//           apikey: "API_KEY_HERE",
//           to: [`91${mobile}`],
//           message: "Hi, this is a test message",
//           format: "json",
//         };


//         if (password) {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const newUser = new userModel({
//                 username,
//                 password: hashedPassword,
//                 email,
//                 mobile,
//                 firstName,
//                 lastName,
//                 profile,
//                 gender,
//                 otp
//             });

//             await newUser.save().then(res => {
//                 springedge.messages.send(params, 5000, function (err, response) {
//                     if (err) {
//                       console.log(err);
//                     }
//                     console.log(response);
//                     res.status(201).send({ msg: "User registered successfully." });
//                   })
//             })
//         }
//     } catch (error) {
//         console.error("Error during registration:", error);
//         return res.status(500).send({ error: "An error occurred." });
//     }
// }

export async function register(req, res) {
    try {
        
        const { username, password, email, mobile, firstName, lastName, profile, gender } = req.body;

        const existingUser = await userModel.findOne({ username }).exec();
        const existingEmail = await userModel.findOne({ email }).exec();
        const existingMobile = await userModel.findOne({ mobile }).exec();
        const otp = generateOTP()

        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique username." });
        }

        if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email." });
        }

        if (existingMobile) {
            return res.status(400).send({ error: "Mobile number already exists" });
        }

        let params = {
            sender: "SEDEMO",
            apikey: "API_KEY_HERE",
            to: [`91${mobile}`],
            message: "Hi, this is a test message",
            format: "json",
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                username,
                password: hashedPassword,
                email,
                mobile,
                firstName,
                lastName,
                profile,
                gender,
                otp
            });

            await newUser.save();

            // Send OTP or any other notifications here

            // Send response after user has been successfully saved
            res.status(201).send({ msg: "User registered successfully." });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
}


export async function verify_address(req,res) {
    try {
        const { mobile, otp } = req.body;

        const user = await userModel.findOne({ mobile }).exec();

        if(user.otp === otp){
            user.updateOne({mobile},{verified: true}).then(response => {
                console.log({response})
                res.status(200).send({msg: "Account Verified"})
            }).catch(err=> {
                res.status(404).send({msg: "something went wrong"})
            })
        }
    } catch (error) {
        res.status(500).send({ error: "An error occurred." });
    }
}

export async function addAddress(req, res) {
    try {
        const userId = req.params.userId;
        const { addressLine, city, state, pincode, lat, lang } = req.body;

        const user = await userModel.findById(userId).exec();
        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        user.addresses.push({ addressLine, city, state, pincode, lat, lang });
        await user.save();

        return res.status(200).send({ msg: "Address added successfully." });
    } catch (error) {
        console.error("Error adding address:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
}

export async function updateAddress(req, res) {
    try {
        const userId = req.params.userId;
        const addressId = req.params.addressId;
        const { addressLine, city, state, pincode, lat, lang } = req.body;

        const user = await userModel.findById(userId).exec();
        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        const addressIndex = user.addresses.findIndex(address => address._id == addressId);
        if (addressIndex === -1) {
            return res.status(404).send({ error: "Address not found." });
        }

        user.addresses[addressIndex].addressLine = addressLine;
        user.addresses[addressIndex].city = city;
        user.addresses[addressIndex].state = state;
        user.addresses[addressIndex].pincode = pincode;
        user.addresses[addressIndex].lat = lat;
        user.addresses[addressIndex].lang = lang;

        await user.save();

        return res.status(200).send({ msg: "Address updated successfully." });
    } catch (error) {
        console.error("Error updating address:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
}

export async function deleteAddress(req, res) {
    try {
        const userId = req.params.userId;
        const addressId = req.params.addressId;

        const user = await userModel.findById(userId).exec();
        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        const addressIndex = user.addresses.findIndex(address => address._id == addressId);
        if (addressIndex === -1) {
            return res.status(404).send({ error: "Address not found." });
        }

        user.addresses.splice(addressIndex, 1);
        await user.save();

        return res.status(200).send({ msg: "Address deleted successfully." });
    } catch (error) {
        console.error("Error deleting address:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
}


export async function login(req, res) {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await userModel.findOne({ username,  }).exec();
        
        // If user doesn't exist
        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        // Check if password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        // If password doesn't match
        if (!passwordMatch) {
            return res.status(400).send({ error: "Password does not match" });
        }

        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, process.env.JWT_SECRET, {expiresIn: "30d"});

        // Attach token to response headers
        res.setHeader('Authorization', `Bearer ${token}`);

        // Respond with successful login message
        return res.status(200).send({
            msg: "Login successful",
            token
        });
    } catch (error) {
        console.error("Error in login function:", error);
        return res.status(500).send({ error: "An error occurred." });
    }
}


export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(501).send({ error: "Invalid username" });
        }

        const user = await userModel.findOne({ username }).exec();
        
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send(user);
    } catch (error) {
        console.error("Error retrieving user data:", error);
        return res.status(500).send({ error: "An error occurred while fetching user data" });
    }
}




export async function updateUser(req, res) {
    const { username } = req.params;
    const updates = req.body; // New user details to update

    try {
        // Validate username
        if (!username) {
            return res.status(400).send({ error: "Invalid username" });
        }

        // Find the user by username
        const user = await userModel.findOne({ username }).exec();
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Update user details
        Object.assign(user, updates);
        await user.save();

        return res.status(200).send({ msg: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).send({ error: "An error occurred while updating user" });
    }
}



export async function deleteUser(req, res) {
    const { username } = req.params;

    try {
        // Validate username
        if (!username) {
            return res.status(400).send({ error: "Invalid username" });
        }

        // Find the user by username and delete
        const deletedUser = await userModel.findOneAndDelete({ username }).exec();

        // Check if user exists
        if (!deletedUser) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ msg: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).send({ error: "An error occurred while deleting user" });
    }
}











































// import userModel from "../model/user.model.js";
// import bcrypt from 'bcrypt';



// export async function register(req, res) {
//     try {
//         const { username, password, email, mobile, firstName, lastName, profile, gender } = req.body;

//         const existingUser = await userModel.findOne({ username }).exec();
//         const existingEmail = await userModel.findOne({ email }).exec();
//         const existingMobile = await userModel.findOne({ mobile }).exec();

//         if (existingUser) {
//             return res.status(400).send({ error: "Please use a unique username." });
//         }

//         if (existingEmail) {
//             return res.status(400).send({ error: "Please use a unique email." });
//         }

//         if (existingMobile) {
//             return res.status(400).send({ error: "Mobile number already exists" });
//         }

//         if (password) {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const newUser = new userModel({
//                 username,
//                 password: hashedPassword,
//                 email,
//                 mobile,
//                 firstName,
//                 lastName,
//                 profile,
//                 gender
//             });

//             await newUser.save();
//             return res.status(201).send({ msg: "User registered successfully." });
//         }
//     } catch (error) {
//         console.error("Error during registration:", error);
//         return res.status(500).send({ error: "An error occurred." });
//     }
// }

// export async function addAddress(req, res) {
//     try {
//         const userId = req.params.userId;
//         const { addressLine, city, state, pincode, lat, lang } = req.body;

//         const user = await userModel.findById(userId).exec();
//         if (!user) {
//             return res.status(404).send({ error: "User not found." });
//         }

//         user.addresses.push({ addressLine, city, state, pincode, lat, lang });
//         await user.save();

//         return res.status(200).send({ msg: "Address added successfully." });
//     } catch (error) {
//         console.error("Error adding address:", error);
//         return res.status(500).send({ error: "An error occurred." });
//     }
// }

// export async function updateAddress(req, res) {
//     try {
//         const userId = req.params.userId;
//         const addressId = req.params.addressId;
//         const { addressLine, city, state, pincode, lat, lang } = req.body;

//         const user = await userModel.findById(userId).exec();
//         if (!user) {
//             return res.status(404).send({ error: "User not found." });
//         }

//         const addressIndex = user.addresses.findIndex(address => address._id == addressId);
//         if (addressIndex === -1) {
//             return res.status(404).send({ error: "Address not found." });
//         }

//         user.addresses[addressIndex].addressLine = addressLine;
//         user.addresses[addressIndex].city = city;
//         user.addresses[addressIndex].state = state;
//         user.addresses[addressIndex].pincode = pincode;

//         await user.save();

//         return res.status(200).send({ msg: "Address updated successfully." });
//     } catch (error) {
//         console.error("Error updating address:", error);
//         return res.status(500).send({ error: "An error occurred." });
//     }
// }

// export async function deleteAddress(req, res) {
//     try {
//         const userId = req.params.userId;
//         const addressId = req.params.addressId;

//         const user = await userModel.findById(userId).exec();
//         if (!user) {
//             return res.status(404).send({ error: "User not found." });
//         }

//         const addressIndex = user.addresses.findIndex(address => address._id == addressId);
//         if (addressIndex === -1) {
//             return res.status(404).send({ error: "Address not found." });
//         }

//         user.addresses.splice(addressIndex, 1);
//         await user.save();

//         return res.status(200).send({ msg: "Address deleted successfully." });
//     } catch (error) {
//         console.error("Error deleting address:", error);
//         return res.status(500).send({ error: "An error occurred." });
//     }
// }


// export async function login(req, res) {
//     const { username, password } = req.body;
//     try {
//         // Find user by username
//         const user = await userModel.findOne({ username }).exec();
        
//         // If user doesn't exist
//         if (!user) {
//             return res.status(404).send({ error: "Username not found" });
//         }

//         // Check if password matches
//         const passwordMatch = await bcrypt.compare(password, user.password);
        
//         // If password doesn't match
//         if (!passwordMatch) {
//             return res.status(400).send({ error: "Password does not match" });
//         }

//         // Respond with successful login message
//         return res.status(200).send({
//             msg: "Login successful"
//         });
//     } catch (error) {
//         console.error("Error in login function:", error);
//         return res.status(500).send({ error: "An error occurred." });
//     }
// }


// export async function getUser(req, res) {
//     const { username } = req.params;

//     try {
//         if (!username) {
//             return res.status(400).send({ error: "Invalid username" });
//         }

//         const user = await userModel.findOne({ username }).exec();
        
//         if (!user) {
//             return res.status(404).send({ error: "User not found" });
//         }

//         return res.status(200).send(user);
//     } catch (error) {
//         console.error("Error retrieving user data:", error);
//         return res.status(500).send({ error: "An error occurred while fetching user data" });
//     }
// }




// export async function updateUser(req, res) {
//     const { username } = req.params;
//     const updates = req.body; // New user details to update

//     try {
//         // Validate username
//         if (!username) {
//             return res.status(400).send({ error: "Invalid username" });
//         }

//         // Find the user by username
//         const user = await userModel.findOne({ username }).exec();
//         if (!user) {
//             return res.status(404).send({ error: "User not found" });
//         }

//         // Update user details
//         Object.assign(user, updates);
//         await user.save();

//         return res.status(200).send({ msg: "User updated successfully" });
//     } catch (error) {
//         console.error("Error updating user:", error);
//         return res.status(500).send({ error: "An error occurred while updating user" });
//     }
// }



// export async function deleteUser(req, res) {
//     const { username } = req.params;

//     try {
//         // Validate username
//         if (!username) {
//             return res.status(400).send({ error: "Invalid username" });
//         }

//         // Find the user by username and delete
//         const deletedUser = await userModel.findOneAndDelete({ username }).exec();

//         // Check if user exists
//         if (!deletedUser) {
//             return res.status(404).send({ error: "User not found" });
//         }

//         return res.status(200).send({ msg: "User deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return res.status(500).send({ error: "An error occurred while deleting user" });
//     }
// }





