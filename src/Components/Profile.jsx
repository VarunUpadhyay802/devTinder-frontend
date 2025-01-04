import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
const Profile = () => {
 
  //For sending the user to the editProfile Component 
  //suscribing to the store and getting the user 
  const user = useSelector((store) => store.user);
  return (
    //It will throw error without this condition
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};
export default Profile;