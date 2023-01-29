import * as React from "react";
import { useState } from "react";
import { steamGame } from "@/consts/steamGames";
import { useAsync } from "@/services/customHooks";
import { getSteamGames } from "@/services/steamService";

const SteamGames = () => {
  const [games, setGames] = useState<steamGame[]>([]);

  useAsync(
    getSteamGames,
    setGames,
    [],
    () => {
      console.error('fuck');
    }
  );

  return (
    <>
      {!!games && games.length !== 0 ? (
        <div>
          Total games: {games.length}
          {games.map((curGame) => (
            <div key={curGame.name}>
              <span>Name: {curGame.name}</span> <br/>
              <span>Play Time: {curGame.playTime}</span>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SteamGames;
