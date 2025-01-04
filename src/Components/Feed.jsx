import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
  const dispatch = useDispatch();
  const updateFeed = async() =>{
    const res = await axios.get(BASE_URL +"/user/feed",{withCredentials:true}) ;
    //we have to store that in redux (just like addUser we have to make one more slice for this seperately)
    dispatch(addFeed(res.data));
  }

  useEffect(()=>{
    updateFeed();
  },[])

  return (
    <div>YOu will see all the feed here </div>
  )
}

export default Feed