import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import UploadFileToken from "../Models/uploadFileModel.js";
import multer from "multer";
dotenv.config({ path: "./.env" });

const storage = new GridFsStorage({
  url: process.env.MONGO_DB_LOCAL_URL,
  file: (req, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = req.query;
        const tokenDoc = await UploadFileToken.findOne({ uploadToken: token });

        if (!tokenDoc || tokenDoc.uploaded ||new Date() > tokenDoc.tokenExpiry) {

          return reject(new Error("Invalid or Expired Token"));

        }

        const filename = `${Date.now()}-${file.originalname}`;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };

        resolve(fileInfo);
      } catch (err) {
        reject(err);
      }
    });
  },
});

const upload = multer({ storage });

export default upload;