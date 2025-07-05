// src/components/Navbar.jsx
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isShowLogin = location.pathname === "/";

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-white z-50 flex items-center justify-between px-6 py-4">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-8">
        <Link to="/feed" className="text-2xl font-bold">
          👩‍💻 DevTinder
        </Link>

        
        
        
        

        {/* Menu Links for Non-logged in Users */}
        {user && (
          <ul className="hidden md:flex space-x-6 text-sm font-semibold">
            
              <li className="px-4 py-2 hover:bg-gray-100">
                   <Link to="/feed">Feed</Link>
                </li>
            <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/connections">Connections</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/requests">Requests</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/premium">Premium</Link>
                </li>
          </ul>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.firstName}</span>
            <div className="relative group">
              <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-white">
                <img src={user.photoUrl} alt="User" />
              </div>
              <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-150 z-50">
                
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </>
        ) : (
          isShowLogin && ( <Link
            to="/login"
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200"
          >
            Log in
          </Link>)
         
        )}
      </div>
    </nav>
  );
};

export default Navbar;
