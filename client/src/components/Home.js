import React from 'react'
import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <Link to={"/group"} state={{}}>
        Group
      </Link>
      <br/>
      <Link to={"/youtube"} state={{}}>
        Youtube
      </Link>
      <br/>
      <Link to={"/member"} state={{}}>
        Member
      </Link>
      <br/>
      <Link to={"/material"}>
        Material
      </Link>
      <br/>
    </>
  )
}

export default Home