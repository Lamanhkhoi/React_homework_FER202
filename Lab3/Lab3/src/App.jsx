import { useState } from 'react'

import './App.css'
import OrchidList from './Orchids/OrchidList'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      <OrchidList/>
    </>
  )
}

export default App
