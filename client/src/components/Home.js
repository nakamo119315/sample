import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';
import '../App.css';

function Home() {
  const [backendData, setBackendData] = useState([{}])
  function deleteClick(deleteId){
    const body = {
      id:deleteId
    }
    axios.post('/delete',body).then(response=>{
      window.location.reload();
    });
  }
  useEffect(() => {
    fetch("/api").then(
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
                  <tr><th>id</th><th>名前</th><th>プロデューサ</th><th>カテゴリ</th><th>更新</th><th>削除</th></tr>
                {backendData.data.map((group, i) => (
                    <tr key={i}><td>{group.id}</td><td>{group.name}</td><td>{group.producer}</td><td>{group.category}</td>
                    <td>
                      <Link to={"/update"} state={{id:group.id}}>
                        Update 
                      </Link>
                    </td>
                    <td>
                      <button class="link-style-btn" onClick={() => deleteClick(group.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </>
          )}
      <Link to={"/register"} state={{}}>
        Register
      </Link>
    </>
  )
}

export default Home