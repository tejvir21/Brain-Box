import axios from "axios";
import "./styles/NavBar.css";

export const NavBar = () => {
  const handleLogOut = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    ).then(res => {
      localStorage.clear()
      window.location.href = "/login"
    }). catch (e => {
      console.log(e)
    }) 
  };

  return (
    <div className="navbar">
      <span>Dashboard</span>
      <a onClick={handleLogOut}>signout</a>
    </div>
  );
};
