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

