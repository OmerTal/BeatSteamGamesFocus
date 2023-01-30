import * as React from "react";
import { useState } from "react";
import { steamGame } from "@/consts/steamGames";
import { useAsync } from "@/services/customHooks";
import { getSteamGames } from "@/services/steamService";
import GameCard from "@components/common/GameCard/gameCard";
import "./steamGames.scss";

const SteamGames = () => {
  const [games, setGames] = useState<steamGame[]>([]);

  useAsync(getSteamGames, setGames, [], () => {
    console.error("fuck");
  });

  return (
    <>
      {!games || games.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          Total games: {games.length}
          <div className="game-card-list">
            {games.map((curGame) => (
              <GameCard game={curGame} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SteamGames;
