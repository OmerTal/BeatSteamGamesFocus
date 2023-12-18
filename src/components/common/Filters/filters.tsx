import * as React from "react";
import { TfiSearch } from "react-icons/tfi";
import "./filters.scss";
import { steamGame } from "@consts/Interfaces/steamGames";

interface FiltersProps {
  searchValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProperty: (property: keyof steamGame) => () => void;
}

const Filters = ({
  searchValue,
  handleInputChange,
  setProperty,
}: FiltersProps) => {
  return (
    <div className="filters">
      <span className="search-bar-container">
        <TfiSearch className="search-bar-icon" />
        <input
          id="game-search"
          className="search-bar"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search for a specific game..."
        />
      </span>
      <span className="sort-by-container">
        Sort By:
        <button onClick={setProperty("name")}>name</button>
        <button onClick={setProperty("playTime")}>play time</button>
      </span>
    </div>
  );
};

export default Filters;
