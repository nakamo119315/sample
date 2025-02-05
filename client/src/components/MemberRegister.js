import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';

function MemberRegister() {
  const [backendData, setBackendData] = useState([{}])
  const [name, setName] = useState("")
  const [group_id, setGroupId] = useState("")
  const [selectedOption, setSelectedOption] = useState("");
  const navigation = useNavigate()
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setGroupId(selectedOption.value);
    console.log(`Option selected:`, selectedOption);
  };
  function registMember(){
    const body = {
      name:name,
      group_id:group_id
    }
    console.log(body)
    axios.post('/member/register',body).then(response=>{
      navigation('/member')
    });
  }
  useEffect(() => {
    fetch("/member/group").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
        console.log(data);
      }
    )
  },[])
  return (
    <div>
      <div>
          <input name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={backendData.data}
          />
      </div>
      <div>
        <button onClick={registMember}>
          登録
        </button>
        <Link to={"/member"} state={{}}>
          Back
        </Link>
      </div>

    </div>
  )
}

export default MemberRegister