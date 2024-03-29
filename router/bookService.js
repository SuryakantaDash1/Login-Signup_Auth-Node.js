import express from 'express';
import { book_a_service, retrieve_requests } from '../controllers/bookService.js';
import multer from 'multer';
// import storageConfig from '../config/multer.config';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Set your upload directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep the original file name
    }
  });
  
  // Initialize multer instance
  const upload = multer({ storage: storage });

const router = express.Router();

router.post('/book_a_service', upload.single('image'), book_a_service);
router.get('/partner/service_requests', retrieve_requests);

export default router;
