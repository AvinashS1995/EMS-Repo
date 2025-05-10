import OTP from "../Models/otpModel.js";
import transporter from "../mail/transporter.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });




// Send OTP API Method
const sendCheckInsOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP before storing
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otpCode, salt);

    // Set OTP expiry (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Store OTP in DB
    await OTP.create({ email, otp: hashedOtp, expiresAt });
console.log(process.env);

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Attendence Check Ins for Email OTP Authetication",
      html: `
    <div style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif; 
                border: 1px solid #ddd; border-radius: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4285F4; text-align: center;">Email OTP</h2>
        <hr style="border: 1px solid #ddd;">
        <p style="font-size: 16px; text-align: center;">Dear User,</p>
        <p style="font-size: 16px; text-align: center;">Your Attendence Check Ins One-Time Password (OTP) is:</p>
        <h1 style="color: #4CAF50; text-align: center; font-size: 36px;">${otpCode}</h1>
        <p style="font-size: 14px; text-align: center;">Please use this OTP to complete your Attendence Check Ins. It is valid for 5 minutes.
            Do not share this code with anyone.</p>
        <p style="font-size: 14px; text-align: center;">Thank you for using Email OTP!</p>
        <hr style="border: 1px solid #ddd;">
        <p style="text-align: center; font-size: 12px; color: #888;">© <a href="https://www.yourwebsite.com" 
                style="color: #4285F4; text-decoration: none;">employeemanagementsystem.com</a>. All rights reserved.</p>
    </div>
  `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          status: "fail",
          message: err.message,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Check Ins OTP Successfully send on your Registered Email.",
      });
    });
  } catch (error) {
    console.log(error)
   return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


export { sendCheckInsOtp }