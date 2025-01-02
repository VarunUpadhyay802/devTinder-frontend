import { Outlet, useNavigate } from "react-router-dom";

import Footer from "./Footer";
import NavBar from "./NavBar";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    //if you already have the userData earlyReturn , you don't want redundant api calls 
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
       //if you get the user , update the store , so dispatch an action basically
      //dispatch an action (which is our adduser)
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        navigate("/login");
      } else {
        console.error("An unexpected error occurred:", err.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      {/* outlet comes from react router dom and will render the children of the body */}
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
