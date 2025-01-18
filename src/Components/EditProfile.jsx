import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  //when we go from signup to directly profile page , age is coming from redux which is alreay empty so handle that carefully
  const [age, setAge] = useState(user.age || 18);
  const [gender, setGender] = useState(user.gender || "male");
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    //Clear the error just before saving the Profile
    setError("");
    const payload = { firstName, lastName, photoUrl, age, gender, about };
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
     
      
      //if you got the response save it to the store
      dispatch(addUser(res?.data?.data));
      //show the toast
      setToast(true);
      setTimeout(()=>{
        //set it to false again
        setToast(false)
      },3000)
      
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <>
      {toast && (
        <div className="toast toast-end toast-middle">
          <div className="alert alert-success">
            <span>Profile Updated Successfully</span>
          </div>
        </div>
      )}

      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-400">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </>
  );
};
export default EditProfile;
