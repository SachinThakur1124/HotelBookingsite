import { Link } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {

  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ textDecoration: "none" }}><span className="logo">Luxury Booking</span></Link>
        {user ?  <span className="userName">{user.username}</span>: (<div className="navItems">
          <Link to="/register">
            <button className="navButton">Register</button>
          </Link>
          <Link to="/login">
            <button className="navButton">Login</button>
          </Link>
        </div>)}
        {!user ? "" : (<button className="navButton" onClick={handleLogout}>Logout</button>)}
      </div>
    </div>
  )
}
