import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("")
  const [producer, setProducer] = useState("")
  const [category, setCategory] = useState("")
  const navigation = useNavigate()
  function registGroup(){
    const body = {
      name:name,
      producer:producer,
      category:category
    }
    console.log(body)
    axios.post('/register',body).then(response=>{
      navigation('/')
    });
  }
  return (
    <div>
      <div>
          <input name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <input name="producer" placeholder="producer" value={producer} onChange={(e) => setProducer(e.target.value)}/>
          <input name="category" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)}/>
      </div>
      <div>
        <button onClick={registGroup}>
          登録
        </button>
      </div>

    </div>
  )
}

export default Register