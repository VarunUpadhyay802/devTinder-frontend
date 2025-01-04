import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const Feed = () => {

  const updateFeed = async() =>{
    const res = await axios.get(BASE_URL +"/user/feed",{withCredentials:true}) ;
    console.log(res.data)
  }

  useEffect(()=>{
    updateFeed();
  },[])

  return (
    <div>YOu will see all the feed here </div>
  )
}

export default Feed