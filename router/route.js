import { Router } from "express";
import { addAddress, deleteAddress, deleteUser, getUser, login, register, updateAddress, updateUser, verifyUser } from "../controller/userController.js";
const router = Router();


router.post('/register', register);
router.post('/login',verifyUser, login);
router.get('/getuser/:username', getUser);
router.put('/updateuser/:username', updateUser);
router.delete('/deleteuser/:username', deleteUser);



router.post("/addresses/:userId", addAddress);
router.put("/addresses/:userId/:addressId", updateAddress);
router.delete("/addresses/:userId/:addressId", deleteAddress);


export default router;







// import { Router } from "express";
// import { addAddress, deleteAddress, deleteUser, getUser, login, register, updateAddress, updateUser, verify_address } from "../controller/userController.js";
// const router = Router();


// router.post('/register', register);
// router.post('/verify', verify_address);
// router.post('/login',/*Middleware,*/ login);
// router.get('/getuser/:username', getUser);
// router.put('/updateuser/:username', updateUser);
// router.delete('/deleteuser/:username', deleteUser);


// router.post("/addresses/:userId", addAddress);
// router.put("/addresses/:userId/:addressId", updateAddress);
// router.delete("/addresses/:userId/:addressId", deleteAddress);


// export default router;


// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

// const jwt = require('jsonwebtoken')
// const { BadRequestError } = require('../errors')

// const login = async (req, res) => {
//   const { username, password } = req.body
//   // mongoose validation
//   // Joi
//   // check in the controller

//   if (!username || !password) {
//     throw new BadRequestError('Please provide email and password')
//   }

//   //just for demo, normally provided by DB!!!!
//   const id = new Date().getDate()

//   // try to keep payload small, better experience for user
//   // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
//   const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   })

//   res.status(200).json({ msg: 'user created', token })
// }

// const dashboard = async (req, res) => {
//   const luckyNumber = Math.floor(Math.random() * 100)

//   res.status(200).json({
//     msg: `Hello, ${req.user.username}`,
//     secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
//   })
// }

// module.exports = {
//   login,
//   dashboard,
// }
