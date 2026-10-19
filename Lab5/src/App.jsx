import { Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Natural from './pages/Natural'
import Detail from './pages/Detail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/naturals" element={<Natural />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
