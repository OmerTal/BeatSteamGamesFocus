import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { steamGame } from "@consts/Interfaces/steamGames";
import GameCard from "@components/common/GameCard/gameCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./gameLibraryList.scss";

interface GameLibraryListProps {
  filteredGames: steamGame[];
}

const ROW_SIZE = 235;
const COLUMN_SIZE = 400;

const GameLibraryList = ({ filteredGames }: GameLibraryListProps) => {
  const [gamesMatrix, setGamesMatrix] = useState<steamGame[][]>([[]]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: gamesMatrix.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_SIZE,
    overscan: 1,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 3,
    getScrollElement: () => parentRef.current,
    estimateSize: () => COLUMN_SIZE,
    overscan: 1,
  });

  useEffect(() => {
    const arr: steamGame[][] = [];
    const games = filteredGames.map((x) => x);
    while (games.length) arr.push(games.splice(0, 3));
    setGamesMatrix(arr);
  }, [filteredGames]);

  return (
    <>
      <div ref={parentRef} className="game-library-list-container">
        {rowVirtualizer.scrollOffset >
          columnVirtualizer.options.count * 200 && (
          <div
            className="game-library-scroll-button-container"
            onClick={() =>
              rowVirtualizer.scrollToIndex(0, {
                align: "auto",
                behavior: "smooth",
              })
            }
          >
            <span className="game-library-scroll-button">
              <svg viewBox="-33 -33 396.00 396.00">
                <path d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z" />
              </svg>
            </span>
            <span className="game-library-scroll-button-text">
              scroll back to top
            </span>
          </div>
        )}
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
                  {gamesMatrix?.[virtualRow.index]?.[virtualColumn.index] && (
                    <GameCard
                      game={gamesMatrix[virtualRow.index][virtualColumn.index]}
                    />
                  )}
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
