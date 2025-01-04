import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("varun@gmail.com");
  const [password, setPassword] = useState("varun@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data.data);
      navigate("/");
      //dispatch an action(function in reducer) from the slice
      dispatch(addUser(res.data.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage(error?.response?.data.message); // Use the backend message
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="email"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {/* <p className="text-red-500">{error}</p> */}
          <p className="text-red-400">{message}</p>
          <div className="card-actions justify-center m-2">
            
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
