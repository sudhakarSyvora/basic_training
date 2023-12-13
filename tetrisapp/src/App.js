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
  const [gameStart, setGameStart] = useState(false);
  const h=generateRandomGridIndexes()
  console.log(h,'h')
  const li=getBottomMostCells(h)
  console.log(li,'li')

  useEffect(() => {
    let intervalId;
    console.log("spiing")
    if (indexes != null) {
      intervalId = setInterval(() => {
        const bottomMost = getBottomMostCells(indexes);
        const isGridEmpty = bottomMost.every(([row, col]) => {
          if (grid && grid[row] && grid[row][col] === null) {
            return true;
          }
          return false;
        });
        console.log(bottomMost,isGridEmpty)
        if (!isGridEmpty) {
        let gridFilledUp=  grid[0].some((item,i)=>{
            if(item){
              return true
            }return false
          })
          
          if (gridFilledUp) {
            alert("Game over your score");
            clearInterval(intervalId);
            } else {
              clearInterval(intervalId);

          setIndexes(generateRandomGridIndexes());

          clearInterval(intervalId);}
          return;
        } else {

          eliminateAdjacentSameCubes(grid)
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const foundIndex = indexes.find(
                  ([row, col]) => --row === rowIndex && col === colIndex
                );
                if (foundIndex) {
                  return null;
                }
                return cell;
              })
            );
            return newGrid;
          });

          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
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
          //game over
           
          if (indexes.some((pi) => pi[0] >= 15)) {
            clearInterval(intervalId);
            // setIndexes(null);
            setIndexes(generateRandomGridIndexes());
            clearInterval(intervalId);

          } else {
            clearInterval(intervalId);
            setIndexes((pI) => pI.map((pi) => [pi[0] + 1, ...pi.slice(1)]));
            clearInterval(intervalId);

          }
        }
      }, 100);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [indexes]);

  function handleClick() {
    setGameStart(true);
    let indexes = generateRandomGridIndexes();
    setIndexes(indexes);
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Your logic for key press handling
      console.log("Key pressed:", event.key);
    };

    // Adding event listener when component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Cleaning up the event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className="App"
      onKeyDown={() => {
        console.log("clicked");
      }}
    >
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
  try {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const startingRowIndex = 0;
    const startingColIndex = getRandomInt(3, 5);

    const indexes = [
      [startingRowIndex, startingColIndex, generateRandomColor()],
    ];
    const adjacentDirections = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    const chooseAdjacentIndex = (row, col) => {
      try {
        const availableDirections = [...adjacentDirections];
        while (
          indexes.length < 3 ||
          (indexes.length === 3 && Math.random() > 0.5)
        ) {
          
          if (availableDirections.length == 0) {
            availableDirections.push(...adjacentDirections);
          }
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
      } catch (e) {
        console.log(e);
        // console.log(availableDirections,"ad")
      }
    };

    chooseAdjacentIndex(startingRowIndex, startingColIndex);

    return indexes;
  } catch (e) {
    console.log(e);
  }
}
function getBottomMostCells(matrix) {
  const columnIndices = new Map();

  matrix.forEach(([row, col], index) => {
    if (!columnIndices.has(col) || index > columnIndices.get(col)) {
      columnIndices.set(col, index);
    }
  });

  const bottomMostCells = Array.from(columnIndices.values()).map(
    (index) => matrix[index]
  );
  return bottomMostCells;
}


function eliminateAdjacentSameCubes(grid){


}
// getBottomMostCells(indexes);