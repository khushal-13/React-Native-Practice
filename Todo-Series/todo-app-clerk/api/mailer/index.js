import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "khushaljogi7@gmail.com",
    pass: "tbpu nvdg yvec wnmp"
  },
});

export const sendMail = (email, otp) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: "OTP Verification for Todo App",
        text: `Welcome to Todo App !! \nYour OTP for verification is ${otp}`,
      },
      (err, info) => {
        if(err) {
            reject(err);
        } else {
            resolve("OK");
        }
      }
    );
  });
};