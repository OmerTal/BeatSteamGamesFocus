import * as React from "react";
import SteamGames from "./SteamGames/steamGames";
import Navbar from "@components/common/Navbar/navbar";

const MainView = () => {
  return (
    <div>
      <Navbar />
      <br />
      <SteamGames />
    </div>
  );
};

export default MainView;
