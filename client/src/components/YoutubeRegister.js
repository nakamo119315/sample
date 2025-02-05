import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function YoutubeRegister() {
  const [name, setName] = useState("")
  const [unique_key, setUniqueKey] = useState("")
  const navigation = useNavigate()
  function registYoutube(){
    const body = {
      name:name,
      unique_key:unique_key
    }
    console.log(body)
    axios.post('/youtube/register',body).then(response=>{
      navigation('/youtube')
    });
  }
  return (
    <div>
      <div>
          <input name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <input name="unique_key" placeholder="unique_key" value={unique_key} onChange={(e) => setUniqueKey(e.target.value)}/>
      </div>
      <div>
        <button onClick={registYoutube}>
          登録
        </button>
        <Link to={"/youtube"} state={{}}>
          Back
        </Link>
      </div>
    </div>
  )
}

export default YoutubeRegister