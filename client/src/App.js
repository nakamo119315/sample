import React from 'react'
import Home from './components/Home'
import GroupHome from './components/GroupHome'
import GroupRegister from './components/GroupRegister'
import GroupUpdate from './components/GroupUpdate'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/group' element={<GroupHome />} />
          <Route path='/group/register' element={<GroupRegister />} />
          <Route path='/group/update' element={<GroupUpdate />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App