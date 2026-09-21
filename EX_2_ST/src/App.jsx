import { useState } from "react";
import "./App.css";
import MyProfile from "./MyProfile.jsx";
import Navigation from "./NavigationComponent/Navigation.jsx";
import Pets from "./NavigationComponent/Pets.jsx";
import Footer from "./NavigationComponent/Footer.jsx";
import Player from "./Players/Players.jsx";
import Main from "./PlayersPresentation/Main.jsx";

function App() {
  return (
    <>
      <Navigation />
      <MyProfile
        textInfo={"textValue"}
        avatarInfo={{
          alt: "ava miyabi",
          src: "https://i.redd.it/u4w8cfsjwkme1.jpg",
        }}
      />
      <Pets />
      <Player/>
      <Main/>
      <Footer/>
    </>
  );
}

export default App;
