import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const { _id , photoUrl, firstName, lastName, gender, about } = user;
  const dispatch = useDispatch();
  //sending interested or ignored to a particular user
  const handleSendRequest = async (status, userId) => {
    // http://localhost:4000/request/send/interested/6735d11044976529bc6684a1
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(removeUserFromFeed(userId));
  };
  return (
    <div className="card bg-base-200 w-96 shadow-2xl">
      <figure>
        <img src={photoUrl} alt={`${firstName}'s Profile`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
