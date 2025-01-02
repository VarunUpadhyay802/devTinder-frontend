import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  //useselector for subscribing to the store
  //means just using the data in the store
  //you create a variable of what you want to get from the store
  const user = useSelector((store) => store.user);
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = async()=>{
      
      try {
        const res = await axios.post(BASE_URL+"/logout" ,{} ,{withCredentials:true}) ;
        console.log(res);
        //logged out from the backend, but still redux hold the data
        //dispatch an action to remove user
        dispatch(removeUser())
        return navigate("/login");
      } catch (err) {
        
        console.log(err)
      }
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👩‍💻 DevTinder</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control"></div>
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && <img src={user?.photoUrl} alt="User" />}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
            <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
                </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              
              <a onClick={()=>handleLogout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
