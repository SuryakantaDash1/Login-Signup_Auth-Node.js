import UserRequest from "../models/bookService.js";
import ShortUniqueId from "short-unique-id";
import path from "path";
import admin from "firebase-admin";
import fs from 'fs';
import mime from 'mime-types'
import dotenv from 'dotenv';
dotenv.config();

const bucketName = "gs://practice-test-665f1.appspot.com";

const privateKeys = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_CERT_URL,
  "universe_domain": process.env.UNIVERSE_DOMAIN
};


admin.initializeApp({
  credential: admin.credential.cert(privateKeys),
  storageBucket: bucketName
});

const bucket = admin.storage().bucket();
const uid = new ShortUniqueId({ length: 10 });

async function uploadImageToFirebaseStorage(localFilePath, originalFileName) {
    try {
      const fileName = `images/${Date.now()}_${uid.randomUUID(5)}_${originalFileName}`;
      const extension = path.extname(originalFileName);
      const contentType = mime.lookup(extension) || 'application/octet-stream';
  
      const file = bucket.file(fileName);
      const fileStream = fs.createReadStream(localFilePath);
  
      await new Promise((resolve, reject) => {
        fileStream.pipe(file.createWriteStream({
          metadata: {
            contentType: contentType
          },
          resumable: false
        }))
        .on('error', (error) => {
          reject(error);
        })
        .on('finish', () => {
          resolve();
        });
      });
  
      console.log("File uploaded successfully.");
      return `${bucketName}/${fileName}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
  


export const book_a_service = async (req, res) => {
    try {
        const { requiredServices, additionalServices, siteArea, siteSpaceType, addressId } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ message: "Image file is required." });
          }
      
          const imageUrl = await uploadImageToFirebaseStorage(imageFile.path, imageFile.originalname);


          const serviceId = `FAQ_${uid.randomUUID()}`.toUpperCase();

        const book_a_service = new UserRequest({
            serviceId,
            requiredServices,
            additionalServices,
            siteImage: {
                name: imageFile.originalname,
                url: imageUrl,
                path: imageFile.path
            },
            siteArea,
            siteSpaceType,
            addressId,
        });

        const result = await book_a_service.save();

        return res.status(200).json({ message: "Request successfully submitted", result });
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const retrieve_requests = async (req, res) => {
  try {
    const requests = await UserRequest.find();
    res
      .status(200)
      .json({ message: "Requests retrieved successfully", requests });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
