import * as React from "react";
import { useRef } from "react";
import { steamGame } from "@consts/Interfaces/steamGames";
import GameCard from "@components/common/GameCard/gameCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./gameLibraryList.scss";

interface GameLibraryListProps {
  filteredGames: steamGame[];
}

const GameLibraryList = ({ filteredGames }: GameLibraryListProps) => {
  const createGamesMatrix = React.useCallback(() => {
    const arr: steamGame[][] = [];
    const games = filteredGames.map((x) => x);
    while (games.length) arr.push(games.splice(0, 3));
    console.count("kaki");
    return arr;
  }, [filteredGames]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredGames.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 235,
    overscan: 1,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 3,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 1,
  });

  return (
    <>
      <div ref={parentRef} className="game-library-list-container">
        <div className="game-library-list">
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <React.Fragment key={virtualRow.key}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <div
                  key={virtualColumn.key}
                  className="game-library-column"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    display: "flex",
                  }}
                >
                  <GameCard
                    game={
                      createGamesMatrix()[virtualRow.index][virtualColumn.index]
                    }
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameLibraryList;
