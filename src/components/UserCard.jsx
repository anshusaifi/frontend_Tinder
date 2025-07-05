import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useLocation } from "react-router-dom";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const location = useLocation();

  const isShowButton = location.pathname === "/profile";

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="w-full h-64 overflow-hidden">
        <img
          src={photoUrl}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body space-y-2">
        <h2 className="card-title text-lg font-semibold">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm text-gray-300">
            {age}, {gender}
          </p>
        )}

        {about && (
          <p className="text-sm text-gray-200 break-words max-h-32 overflow-auto">
            {about}
          </p>
        )}

        {!isShowButton && (
          <div className="card-actions justify-center mt-4 space-x-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("intrested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
