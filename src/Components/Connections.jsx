import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  //   const [connections, setConnections] = useState([]);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //no need of this below variable when you already have store
      //   setConnections(connections?.data?.data);

      //dispatch an action and that action is addConnection
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  if (!connections || connections.length === 0) {
    console.log("No connections or still loading");
    return <div>No Connection Found</div>;
  }

  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>
        {connections.map((connection ) => {
          const {_id ,  firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto" key={_id}>
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
