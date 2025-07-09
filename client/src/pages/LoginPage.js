import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "../assets/image.png";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [OTP, setOTP] = useState("");

  // const handleGoogleLogin = async () => {
  //   const dummyGoogleUser = {
  //     email: "googleuser@example.com",
  //     name: "Google User",
  //     googleId: "google123",
  //   };

  //   const res = await fetch("http://localhost:5000/api/auth/google-login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(dummyGoogleUser),
  //   });

  //   const data = await res.json();
  //   localStorage.setItem("token", data.token);
  //   localStorage.setItem("user", JSON.stringify(data.user));
  //   navigate("/welcome");
  // };

  const sendOtp = async () => {
    const otp_to_verify = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setOTP(otp_to_verify);
    if (!email) {
      setError("Please fill the email field");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/send-otp`, {
        email,
        otp: otp_to_verify,
      });
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
        "http://localhost:5000/api/auth/verify-otp",
        { email, name: "", dateOfBirth: "" },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/welcome");
    } catch {
      setError("Invalid OTP");
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          id="outlined"
        />
        {/* <Button onClick={handleGoogleLogin} variant="contained">
          Login with Google
        </Button> */}
        {otpSent ? (
          <>
            <TextField
              id="outlined"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              label="OTP"
            />
            // <p>
            //   <a href="" onClick={sendOtp}>
            //     Resend OTP
            //   </a>
            // </p>
            <Button variant="contained" onClick={verifyOtp}>
              Sign In
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={sendOtp}>
            Send OTP
          </Button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Need an Account?<a href="/"> Create One</a>
        </p>
      </div>

      <div className="image">
        <img src={Image} alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
