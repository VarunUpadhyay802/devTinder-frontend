import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const Ignored = () => {
  const dispatch = useDispatch();
  const ignored = useSelector((store) => store.ignored);

  const updateIgnored = async () => {
    try {
      if (ignored) return;
      else {
        const res = await axios.get(BASE_URL + "/user/ignored", {
          withCredentials: true,
        });
        console.log(res.data.data)
        // dispatch(addFeed(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateIgnored();
  }, []);
  if (!ignored || ignored.length == 0)
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-5 mt-40">
          <div className="text-2xl font-bold text-center items-center flex">
            You haven't ignored anyone
          </div>
          <div>
            <img
              src="/images/vecteezy_empty-open-cardboard-box-for-packing_46006535.png"
              alt="No feed"
              className="w-[25%] mx-auto"
            />
          </div>
        </div>
      </>
    )
  return (
    <>
      {/* {feed &&
        feed?.map((index, element) => {
          <UserCard key={index} user={element} />;
        })} */}
      {feed && (
        <div className="flex justify-center mt-4">
          <UserCard user={feed[0]} />;
        </div>
      )}
    </>
  )
}

export default Ignored;
