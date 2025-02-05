import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';
import '../App.css';

function MemberHome() {
  const [backendData, setBackendData] = useState([{}])
  function deleteClick(deleteId){
    const body = {
      id:deleteId
    }
    axios.post('/member/delete',body).then(response=>{
      window.location.reload();
    });
  }
  useEffect(() => {
    fetch("/member/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  return (
    <>
          {(typeof backendData.data === 'undefined') ? (
          <p>Loading...</p>
          ): (
            <>
              <table border="1">
                <tbody>
                  <tr><th>id</th><th>名前</th><th>グループ名</th><th>更新</th><th>削除</th></tr>
                {backendData.data.map((member, i) => (
                    <tr key={i}><td>{member.id}</td><td>{member.name}</td><td>{member.group_name}</td>
                    <td>
                      <Link to={"/member/update"} state={{id:member.id}}>
                        Update 
                      </Link>
                    </td>
                    <td>
                      <button class="link-style-btn" onClick={() => deleteClick(member.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </>
          )}
      <div>
        <Link to={"/member/register"} state={{}}>
          Register
        </Link>
      </div>
      <div>
        <Link to={"/"} state={{}}>
          Home
        </Link>
      </div>
    </>
  )
}

export default MemberHome