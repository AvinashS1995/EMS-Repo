import crypto from "crypto";
import UploadFileToken from "../Models/uploadFileModel.js";
import { gfs } from "../db/db.js";

export const generateUploadUrl = async (req, res) => {
  const { filename, filetype, size } = req.body;

  const token = crypto.randomBytes(16).toString("hex");
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

  await UploadFileToken.create({
    filename,
    filetype,
    size,
    uploadToken: token,
    tokenExpiry: expiry,
  });

  res.json({
    uploadUrl: `${process.env.MONGO_DB_LOCAL_URL}/upload?token=${token}`,
    expiresAt: expiry,
  });
};

export const uploadFile = async (req, res) => {

  const { token } = req.body;

  console.log(token)

  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "Missing token",
    });
  }

  const fileToken = await UploadFileToken.findOne({ uploadToken: token });

  if (!fileToken) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Token",
    });
  }

  if (fileToken.uploaded) {
    return res.status(400).json({
      status: "fail",
      message: "Already uploaded",
    });
  }

  if (new Date() > fileToken.tokenExpiry) {
    return res.status(400).json({
      status: "fail",
      message: "Token Expired",
    });
  }

  fileToken.uploaded = true;

  await fileToken.save();

  return res.status(400).json({
    status: "success",
    message: "File uploaded successfully to GridFS",
  });

};

export const downloadFile = async (req, res) => {

  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file)
      return res.status(404).json({
        status: "fail",
        message: "File Not Found",
      });

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);

  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error retrieving file",
    });
  }
};

