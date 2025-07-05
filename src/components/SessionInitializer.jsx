// src/components/SessionInitializer.jsx
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const SessionInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/me", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        console.log("No active session", err);
      }
    };

    fetchUser();
  }, []);

  return null;
};

export default SessionInitializer;
