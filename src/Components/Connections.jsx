import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //no need of this below variable when you already have store 
    //   setConnections(connections?.data?.data);
      console.log(connections?.data?.data);
      //dispatch an action and that action is addConnection
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  return <>
    <div className="flex items-center justify-center">
        <div className="font-bold text-3xl">Connections</div>
        <div>
            {/* {
                connections.map((user , key)=>{
                    return {
                        <UserCard/>
                    }
                })
            } */}
        </div>
    </div>
  </>;
};

export default Connections;
