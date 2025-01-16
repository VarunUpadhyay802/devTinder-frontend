import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

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

        //we have to store that in redux (just like addUser we have to make one more slice for this seperately)
        dispatch(addFeed(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateFeed();
  }, []);
  if (!feed || feed.length == 0)
    return (
      <div className="text-2xl font-bold text-center items-center flex">
        You don't have any new User on your feed{" "}
      </div>
    );
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
  );
};

export default Feed;
