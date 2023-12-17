import * as React from "react";
import { useMemo, useRef, useState } from "react";
import { steamGame } from "@consts/Interfaces/steamGames";
import { useAsync } from "@omer-tal/react-hook-use-async";
import { getSteamGames } from "@/services/steamService";
import GameCard from "@components/common/GameCard/gameCard";
import SteamLoad from "@assets/steam-load.gif";
import { TfiSearch } from "react-icons/tfi";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./steamGames.scss";

const SteamGames = () => {
  const [games, setGames] = useState<steamGame[]>([]);
  const [filteredGames, setFilteredGames] = useState<steamGame[]>(games);
  const [sortProperty, setSortProperty] = useState<keyof steamGame>("playTime");
  const [searchValue, setSearchValue] = useState<string>("");

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredGames.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 250,
    overscan: 9,
  });

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
            <span className="sub-title">Total games: {games.length}</span>
          </div>
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
          <div className="game-card-list">
            {sortedGames.length === 0 ? (
              <span className="no-games">
                No games found for search term '{searchValue}'
              </span>
            ) : (
              <div
                ref={parentRef}
                style={{
                  height: `500px`,
                  width: "100%",
                  overflow: "auto",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const currIndex = virtualRow.index;
                  return (
                    <React.Fragment key={virtualRow.key}>
                      {virtualRow.index % 3 == 0 && (
                        <div
                          style={{
                            width: "100%",
                            height: `${virtualRow.size}px`,
                            display: "flex",
                          }}
                        >
                          <GameCard game={filteredGames[currIndex]} />
                          <GameCard game={filteredGames[currIndex + 1]} />
                          <GameCard game={filteredGames[currIndex + 2]} />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SteamGames;
