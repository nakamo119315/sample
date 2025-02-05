import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useLocation } from "react-router-dom";

function YoutubeUpdate() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [unique_key, setUniqueKey] = useState("")
  const navigation = useNavigate()
  const location = useLocation();
  const updateId = location?.state?.id;
  function updateYoutube(){
    const body = {
      id:id,
      name:name,
      unique_key:unique_key
    }
    axios.post('/youtube/update',body).then(response=>{
      navigation('/youtube')
    });
  }
  useEffect(() => {
    const body = {
      id:updateId
    }
    axios.post('/youtube/api', body).then(response=>{
      let data = response.data.data[0]
      setId(data.id)
      setName(data.name)
      setUniqueKey(data.unique_key)
    });
  },[updateId])
  return (
    <>
          {(id === "") ? (
          <p>Loading...</p>
          ): (
            <>
              <div>
                <div>
                    <input name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input name="unique_key" placeholder="unique_key" value={unique_key} onChange={(e) => setUniqueKey(e.target.value)}/>
                </div>
                <div>
                  <button onClick={updateYoutube}>
                   更新 
                  </button>
                </div>
              </div>
              <Link to={"/youtube"} state={{}}>
                Back
              </Link>
            </>
          )}
    </>
  )
}

export default YoutubeUpdate