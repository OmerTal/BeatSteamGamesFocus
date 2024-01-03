import * as React from "react";
import { useMemo, useState } from "react";
import { steamGame } from "@consts/Interfaces/steamGames";
import { useAsync } from "@omer-tal/react-hook-use-async";
import { getSteamGames } from "@/services/steamService";
import SteamLoad from "@assets/steam-load.gif";
import "./steamGames.scss";
import GameLibraryList from "./GameLibraryList/gameLibraryList";
import Filters from "@components/common/Filters/filters";

const SteamGames = () => {
  const [games, setGames] = useState<steamGame[]>([]);
  const [filteredGames, setFilteredGames] = useState<steamGame[]>(games);
  const [sortProperty, setSortProperty] = useState<keyof steamGame>("playTime");
  const [searchValue, setSearchValue] = useState<string>("");

  useAsync(
    getSteamGames,
    (data: steamGame[]) => {
      setGames(data);
      setFilteredGames(data);
    },
    [],
    () => {
      console.error("fuck");
    }
  );

  const sortedGames = useMemo(() => {
    const sortedGames = filteredGames.sort((prevGame, nextGame) =>
      prevGame[sortProperty]
        .toString()
        .localeCompare(nextGame[sortProperty].toString(), undefined, {
          numeric: true,
          sensitivity: "base",
        })
    );
    return sortProperty === "playTime" ? sortedGames.reverse() : sortedGames;
  }, [filteredGames, sortProperty]);

  const setProperty = (property: keyof steamGame) => () => {
    setSortProperty(property);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value;
    setSearchValue(searchInput);

    const filteredGames =
      searchInput === ""
        ? games
        : games.filter((game) =>
            game.name.toLowerCase().includes(searchInput.toLowerCase())
          );

    setFilteredGames(filteredGames);
  };

  return (
    <>
      {!games || games.length === 0 ? (
        <div className="library-loading-container">
          <span className="loading-title">Loading your game library...</span>
          <img src={SteamLoad} className="loading-gif" />
        </div>
      ) : (
        <div className="library-container">
          <div className="titles">
            <span className="title">Your Library</span>
            <span className="sub-title">
              Total games: {games.length}
              {filteredGames.length !== games.length &&
                `, Filtered games: ${filteredGames.length}`}
            </span>
          </div>
          <Filters
            searchValue={searchValue}
            handleInputChange={handleInputChange}
            setProperty={setProperty}
          />
          <div className="game-card-list">
            {sortedGames.length === 0 ? (
              <span className="no-games">
                No games found for search term '{searchValue}'
              </span>
            ) : (
              <GameLibraryList filteredGames={filteredGames} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SteamGames;
