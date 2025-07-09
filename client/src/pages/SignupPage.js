import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/SignupPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "../assets/image.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    const otp_to_verify = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setOTP(otp_to_verify);
    if (!email || !name || !dateOfBirth) {
      setError("Please fill all fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (!dateOfBirth || dateOfBirth.isAfter(new Date())) {
      setError("Invalid date of birth");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/send-otp`,
        {
          email,
          otp: otp_to_verify,
        },
        { withCredentials: true }
      );
      setOtpSent(true);
      setError("");
    } catch {
      setError("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      if (OTP !== otp) {
        setError("Invalid OTP");
        return;
      }

      const res = await axios.post(
        ${process.env.REACT_APP_API_URL}/api/auth/verify-otp`,
        { email, name, dateOfBirth }
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/welcome");
    } catch {
      setError("Invalid OTP");
    }
  };

  useEffect(() => {
    document.title = "Signup";
  }, []);

  return (
    <div className="signup-container">
      <div class="signup-box">
        {" "}
        <h2>Signup</h2>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Full Name"
          variant="outlined"
          id="outlined"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            variant="outlined"
            label="Date of Birth"
            value={dateOfBirth}
            onChange={(newValue) => setDateOfBirth(newValue)}
          />
        </LocalizationProvider>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          id="outlined"
        />
        {otpSent ? (
          <>
            <TextField
              id="outlined"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              label="Enter OTP"
            />
            <Button variant="contained" onClick={verifyOtp}>
              Verify OTP
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={sendOtp}>
            Send OTP
          </Button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Already registered? <a href="/login">Login</a>
        </p>
      </div>

      <div class="image">
        <img src={Image} alt="" />
      </div>
    </div>
  );
};

export default SignupPage;
