import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  return (
    <div>
     
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <button style={{backgroundColor:"gray",padding:"20px"}} onClick={handleLogout}>Logout</button>
        </div>
     
    </div>
  );
}
