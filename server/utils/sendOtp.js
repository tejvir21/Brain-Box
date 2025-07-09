const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {

  // Configure transporter (use environment variables for security)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

const mailOptions = {
  from: `"Brain Box" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Brain Box - OTP Verification",
  text: `Hello,

Thank you for signing up with Brain Box!

Your One-Time Password (OTP) for verification is: ${otp}

Please enter this OTP in the app to complete your registration or login.

If you did not request this, please ignore this email.

Best regards,
The Brain Box Team
`,
}

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    return otp;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = { sendOtp };