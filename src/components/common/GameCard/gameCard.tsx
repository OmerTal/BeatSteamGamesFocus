import * as React from "react";
import { steamGame } from "@consts/Interfaces/steamGames";
import { usePalette } from "react-palette";
import "./gameCard.scss";

interface GameCardProps {
  game: steamGame;
}

const GameCard = ({ game }: GameCardProps) => {
  const { data, loading, error } = usePalette(game.logo);

  return (
    <div key={game.name} className="game-card">
      <img className="game-logo" src={game.logo} alt={game.name} />
      <div
        className="card-content"
        style={{ backgroundColor: loading ? "gainsboro" : data.lightVibrant }}
      >
        <span className="game-name">{game.name}</span>
        <span className="game-playtime">Play Time: {game.playTime}</span>
      </div>
    </div>
  );
};

export default GameCard;
