import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { ThreeDots } from "react-loader-spinner";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const updateFeed = async () => {
    try {
      if (feed) return;
      else {
        const res = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });

        dispatch(addFeed(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateFeed();
  }, []);
  if (!feed) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 ">
      <div className="text-2xl lg:text-3xl">Loading</div>
      <div className="">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#ffff"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
    );
  }
  if (feed.length == 0)
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-5 mt-40">
          <div className="text-2xl font-bold text-center items-center flex">
            Empty Feed
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
    );
  return (
    <>
      {feed && (
        <div className="flex justify-center mt-4">
          <UserCard user={feed[0]} />;
        </div>
      )}
      
      
    </>
  );
};

export default Feed;
