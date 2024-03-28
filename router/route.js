import { Router } from "express";
import { addAddress, deleteAddress, deleteUser, getUser, login, register, updateAddress, updateUser, verifyUser } from "../controller/userController.js";
import { createExclusiveGallery, createExclusiveService, createHomeBanner, createProofOfWork, getExclusiveGallery, getExclusiveServices, getHomeBanner, getProofOfWork } from "../controller/HomeController.js";
const router = Router();


router.post('/register', register);
router.post('/login',verifyUser, login);
router.get('/getuser/:username', getUser);
router.put('/updateuser/:username', updateUser);
router.delete('/deleteuser/:username', deleteUser);



router.post("/addresses/:userId", addAddress);
router.put("/addresses/:userId/:addressId", updateAddress);
router.delete("/addresses/:userId/:addressId", deleteAddress);

// for home routes
router.post('/createHomeBanner', createHomeBanner);
router.get('/getHomeBanner', getHomeBanner);
// Route for creating a new exclusive gallery item
router.post('/exclusiveGallery', createExclusiveGallery);
router.get('/getExclusiveGallery/:uniqueId',getExclusiveGallery);
// Route for creating a new exclusive service
router.post('/createExclusiveService', createExclusiveService);
router.get('/getExclusiveService/:uniqueId',getExclusiveServices);
// Route for creating a new proof of work item
router.post('/createProofOfWork', createProofOfWork);
router.get('/getProofOfWork/:uniqueId',getProofOfWork);



export default router;

