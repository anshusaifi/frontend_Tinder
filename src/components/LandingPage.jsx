import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      // Don't navigate to login automatically - let the user stay on landing page
      if (err.response?.status === 401) {
        console.log("User not authenticated");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const isHome = location.pathname === "/";

  if (loading) {
    return <div className="text-center mt-20 text-white">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* 🔥 Background image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://www.shutterstock.com/shutterstock/photos/1855902823/display_1500/stock-vector-white-flame-icon-isolated-on-a-color-gradient-fire-burning-flaming-element-vector-illustration-1855902823.jpg')`,
        }}
      />

      <Navbar />

      <main className="pt-24 pb-40 relative z-10">
        {/* Show HeroSection only when user is logged out and on home page */}
        {isHome && !userData ? (
          <HeroSection />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default LandingPage;