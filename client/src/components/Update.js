import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

function Update() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [producer, setProducer] = useState("")
  const [category, setCategory] = useState("")
  const navigation = useNavigate()
  const location = useLocation();
  const updateId = location?.state?.id;
  function updateGroup(){
    const body = {
      id:id,
      name:name,
      producer:producer,
      category:category
    }
    axios.post('/update',body).then(response=>{
      navigation('/')
    });
  }
  useEffect(() => {
    const body = {
      id:updateId
    }
    axios.post('/api', body).then(response=>{
      let data = response.data.data[0]
      setId(data.id)
      setName(data.name)
      setProducer(data.producer)
      setCategory(data.category)
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
                    <input name="producer" placeholder="producer" value={producer} onChange={(e) => setProducer(e.target.value)}/>
                    <input name="category" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>
                <div>
                  <button onClick={updateGroup}>
                   更新 
                  </button>
                </div>
              </div>
            </>
          )}
    </>
  )
}

export default Update