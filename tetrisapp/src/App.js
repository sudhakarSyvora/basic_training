import "./App.css";
import { useEffect, useState } from "react";
const initialRows = 16;
const initialCols = 9;
function App() {
  const [grid, setGrid] = useState(() => {
    return Array.from({ length: initialRows }, () =>
      Array.from({ length: initialCols }, () => null)
    );
  });
  const [indexes, setIndexes] = useState();

  function c(indexes) {
    const flowTimeout = setInterval(() => {
    
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            console.log(indexes,"indexes in setgrid")
            const foundIndex = indexes.find(
              ([row, col]) => row === rowIndex && col === colIndex
            );
            if (foundIndex) {
              return foundIndex[2];
            }
            return cell;
          })
        );
         
        return newGrid;
      });
    }, 1000);
  }

  function handleClick() {
    let indexes = generateRandomGridIndexes();
    console.log(indexes,'ind at start')
    c(indexes);
  }

  return (
    <div className="App">
      <h1>cool-tris</h1>
      <button onClick={handleClick}>Click</button>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((colour, colIndex) => {
              return (
                <div
                  key={colIndex}
                  className={`grid-cell`}
                  style={{ backgroundColor: colour }}
                >
                  {rowIndex + "," + colIndex}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

function generateRandomColor() {
  const colours = ["red", "blue", "green", "yellow", "purple"];
  return colours[Math.floor(Math.random() * colours.length)];
}
function generateRandomGridIndexes() {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const startingRowIndex = 0;
  const startingColIndex = getRandomInt(3, 5); 

  const indexes = [[startingRowIndex, startingColIndex, generateRandomColor()]];
  const adjacentDirections = [
    [-1, 0],  
    [1, 0],  
    [0, -1], 
    [0, 1],  
  ];

  const chooseAdjacentIndex = (row, col) => {
    const availableDirections = [...adjacentDirections];
    while (
      indexes.length < 3 ||
      (indexes.length === 3 && Math.random() > 0.5)
    ) {
      const [rowOffset, colOffset] = availableDirections.splice(
        Math.floor(Math.random() * availableDirections.length),
        1
      )[0];
      const newRow = row + rowOffset;
      const newCol = col + colOffset;
      if (
        newRow >= 0 &&
        newRow <= 2 &&
        newCol >= 3 &&
        newCol <= 5 &&
        !indexes.some(([r, c]) => r === newRow && c === newCol)
      ) {
        indexes.push([newRow, newCol, generateRandomColor()]);
        chooseAdjacentIndex(newRow, newCol);
      }
    }
  };

  chooseAdjacentIndex(startingRowIndex, startingColIndex);

  return indexes;
}
