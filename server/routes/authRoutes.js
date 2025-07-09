const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp, googleLogin } = require("../controllers/authController");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/logout", (req, res) => {
    try {
            res.clearCookie("token")
            return res.status(200).json({message: "Logged Out"})
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: "error in logging out"})
    }
})
// router.post("/google-login", googleLogin);

module.exports = router;
