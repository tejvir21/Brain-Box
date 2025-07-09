import { useEffect } from "react";
import Notes from "../components/Notes";
import { useNavigate } from "react-router-dom";
import "./styles/WelcomePage.css";
import { NavBar } from "../components/NavBar";

const WelcomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    document.title = "Profile"
  })

  return (
    <>
      <NavBar />

      <div className="welcome-page">
        <div className="profile">
          <h2>Welcome, {user?.name || user?.email}!</h2>
          <p>Email: {user?.email}</p>
        </div>
        <Notes />
      </div>
    </>
  );
};

export default WelcomePage;
