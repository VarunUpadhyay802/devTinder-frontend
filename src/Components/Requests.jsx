import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removremovRequest } from "../utils/requestSlice";
import { useEffect } from "react";
//All the pending requests here
const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/pending", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  const reviewRequests = (status, _id) => {
    try {
      // /request/review/:status/:requestId (remember : that it's your request ID in the url)
      //if you don't want to send the data ,just keep it empty but do send it
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      //dispatch and action remove request after removing , and pass the ID of the request
      dispatch(removremovRequest(_id))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1> No Requests Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold dar text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={()=>reviewRequests("rejected" , request._id)}>
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={()=>reviewRequests("accepted" , request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
