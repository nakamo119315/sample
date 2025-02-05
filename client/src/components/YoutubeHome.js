import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css';

function YoutubeHome() {
  const [backendData, setBackendData] = useState([{}])
  const navigation = useNavigate()
  function deleteClick(deleteId){
    const body = {
      id:deleteId
    }
    axios.post('/youtube/delete',body).then(response=>{
      window.location.reload();
    });
  }
  useEffect(() => {
    fetch("/youtube/api").then(
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
                  <tr><th>id</th><th>名前</th><th>url</th><th>サムネ</th><th>更新</th><th>削除</th></tr>
                {backendData.data.map((youtube, i) => (
                    <tr key={i}><td>{youtube.id}</td><td>{youtube.name}</td><td>{youtube.unique_key}</td><td>
                      <img
                        src={`https://img.youtube.com/vi/`+youtube.unique_key+`/maxresdefault.jpg`}
                        onClick={() => navigation('/youtube/viewer',{state:{videoId:youtube.unique_key}})} 
                        alt="サムネイル"
                        width="193" height="130"
                      /></td>
                    <td>
                      <Link to={"/youtube/update"} state={{id:youtube.id}}>
                        Update 
                      </Link>
                    </td>
                    <td>
                      <button class="link-style-btn" onClick={() => deleteClick(youtube.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </>
          )}
      <div>
        <Link to={"/youtube/register"} state={{}}>
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

export default YoutubeHome