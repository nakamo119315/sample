import React from 'react'
import Home from './components/Home'
import GroupHome from './components/GroupHome'
import GroupRegister from './components/GroupRegister'
import GroupUpdate from './components/GroupUpdate'
import YoutubeHome from './components/YoutubeHome'
import YoutubeRegister from './components/YoutubeRegister'
import YoutubeUpdate from './components/YoutubeUpdate'
import YoutubeViewer from './components/YoutubeViewer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MemberHome from './components/MemberHome'
import MemberRegister from './components/MemberRegister'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/member' element={<MemberHome />} />
          <Route path='/member/register' element={<MemberRegister />} />
          <Route path='/group' element={<GroupHome />} />
          <Route path='/group/register' element={<GroupRegister />} />
          <Route path='/group/update' element={<GroupUpdate />} />
          <Route path='/youtube' element={<YoutubeHome />} />
          <Route path='/youtube/register' element={<YoutubeRegister />} />
          <Route path='/youtube/update' element={<YoutubeUpdate />} />
          <Route path='/youtube/viewer' element={<YoutubeViewer />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App