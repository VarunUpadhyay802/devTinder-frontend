import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res);
      console.log(connections?.data?.data);
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
        <div></div>
    </div>
  </>;
};

export default Connections;
