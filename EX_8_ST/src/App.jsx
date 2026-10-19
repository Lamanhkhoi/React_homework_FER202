
import "./App.css";
import "./Router.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Players/Navigation";
import Players from "./Players/Players";
import Detail from "./Players/Detail";
import Contact from "./Players/Contact";
import Footer from "./Players/Footer";

function App() {
  return (
    <>
      <div className="center">
        <Navigation />
        <Routes>
          <Route path="/" element={<Players />}>Players</Route>
          <Route path="/detail/:id" element={<Detail />}>Detail</Route>
          <Route path="/contact" element={<Contact />}>Contact</Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
