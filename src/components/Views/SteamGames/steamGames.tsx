import * as React from "react";
import { useMemo, useState } from "react";
import { steamGame } from "@consts/Interfaces/steamGames";
import { useAsync } from "@omer-tal/react-hook-use-async";
import { getSteamGames } from "@/services/steamService";
import GameCard from "@components/common/GameCard/gameCard";
import SteamLoad from "@assets/steam-load.gif";
import "./steamGames.scss";

const SteamGames = () => {
  const [games, setGames] = useState<steamGame[]>([]);
  const [sortProperty, setSortProperty] = useState<keyof steamGame>("playTime");

  useAsync(getSteamGames, setGames, [], () => {
    console.error("fuck");
  });

  const sortedGames = useMemo(() => {
    const sortedGames = games.sort((prevGame, nextGame) =>
      prevGame[sortProperty]
        .toString()
        .localeCompare(nextGame[sortProperty].toString(), undefined, {
          numeric: true,
          sensitivity: "base",
        })
    );
    return sortProperty === "playTime" ? sortedGames.reverse() : sortedGames;
  }, [games, sortProperty]);

  const setProperty = (property: keyof steamGame) => () => {
    setSortProperty(property);
  };

  return (
    <>
      {!games || games.length === 0 ? (
        <div className="library-loading-container">
          <span className="loading-title">Loading your game library...</span>
          <img src={SteamLoad} className="loading-gif" />
        </div>
      ) : (
        <div>
          <span>Total games: {games.length}</span>
          <br />
          <span>Sort By: </span>
          <button onClick={setProperty("name")}>name</button>
          <button onClick={setProperty("playTime")}>play time</button>
          <div className="game-card-list">
            {sortedGames.map((curGame) => (
              <GameCard key={curGame.appID} game={curGame} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SteamGames;
