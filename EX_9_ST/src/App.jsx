import './App.css'
import { Routes, Route } from 'react-router-dom'
import Players from './Players'
import Add from './Add'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Players />} />
      <Route path='/dashboard' element={<Players />} />
      <Route path='/add' element={<Add />} />
    </Routes>
  )
}

export default App
