import * as React from "react";
import { steamGame } from "@/consts/steamGames";
import "./gameCard.scss";

interface GameCardProps {
  game: steamGame;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div key={game.name} className="game-card">
      <img className="game-logo" src={game.logo} alt={game.name} />
      <div className="card-content">
        <span>{game.name}</span>
        <span>Play Time: {game.playTime}</span>
      </div>
    </div>
  );
};

export default GameCard;
