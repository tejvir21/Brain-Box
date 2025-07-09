const User = require("../models/User");
const { sendOtp } = require("../utils/sendOtp");
const { generateToken } = require("../utils/jwt");

exports.sendOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  sendOtp(email, otp);
  return res.json({ message: "OTP sent" });
};

exports.verifyOtp = async (req, res) => {
  const { email, name, dateOfBirth } = req.body;

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, name, dateOfBirth });

  const token = generateToken(user);

  console.log("User logged in:", user.email, token);

  res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});

  return res.status(200).json({ user });
};

// exports.googleLogin = async (req, res) => {
//   const { googleId, email, name } = req.body;
//   if (!googleId || !email) return res.status(400).json({ message: "Missing data" });

//   let user = await User.findOne({ googleId });
//   if (!user) user = await User.create({ email, googleId, name });

//   const token = generateToken(user);
//   res.json({ token, user });
// };
