const GRID = Array.from({ length: 16 }, () =>
  Array.from({ length: 9 }, () => null)
);
let START_GAME = false;
let SCORE_ELEMENT = document.querySelector("#score");
let score = 0;
const playGround = document.querySelector(".ground");
let fallingCubesIndexes = generateFallingCubes();
function renderGrid() {
  playGround.innerHTML = "";
  GRID.forEach((row, i) => {
    const rowElem = document.createElement("div");
    rowElem.classList.add("row");
    row.forEach((cell, j) => {
      const singleBox = document.createElement("div");
      singleBox.classList.add("singleBox");
      singleBox.textContent = `${i},${j}`;
      singleBox.style.backgroundColor = GRID[i][j];
      rowElem.appendChild(singleBox);
    });
    playGround.appendChild(rowElem);
  });
}

 

async function startGame() {
  // playGround.innerHTML = "";
  START_GAME = true;

  while (START_GAME) {
    console.log(fallingCubesIndexes, "fci");
    const bottomMostCells = getBottomMostCells(fallingCubesIndexes);
    console.log(bottomMostCells, "bmc");
    const isGridEmpty = bottomMostCells.every(([row, col]) => {
      if (row == 15) return false;
      if (GRID?.[row + 1] && GRID?.[row + 1]?.[col] === null) {
        return true;
      }
      return false;
    });
    console.log(isGridEmpty, "ige");
    // return

    fallingCubesIndexes.forEach(([r, c, color]) => {
      GRID[r][c] = color;
    });
    // popAndSettle();

    renderGrid();

    // return;
    if (!isGridEmpty) {
      // return;
      popAndSettle();
      // return;
      console.log(isGameFinished());
      if (isGameFinished()) {
        return alert("Your score " + score);
      }
      fallingCubesIndexes = generateFallingCubes();
    } else {
      let isIndexIsAtLast = fallingCubesIndexes.some(([r, c, color]) => {
        if (r >= 15) {
          return true;
        }
        return false;
      });
      if (!isIndexIsAtLast) {
        fallingCubesIndexes.forEach(([r, c, color]) => {
          // let lastRow = r - 1;
          // if (GRID[lastRow] && GRID[lastRow][c]) {
          //   GRID[lastRow][c] = null;
          // }
          GRID[r][c] = null;
        });
        fallingCubesIndexes = fallingCubesIndexes.map((row) => {
          row[0]++;
          return row;
        });
      }
    }

    await new Promise((res, rej) => {
      setInterval(res, 200);
    });
  }
}
function popAndSettle() {
  for (let j = 0; j < GRID[0].length; j++) {
    let buffer = [];
    for (let i = 0; i < GRID.length; i++) {
      if (GRID[i][j] === GRID?.[i - 1]?.[j] && GRID[i][j] != null) {
        buffer.push([i, j]);
      } else if (buffer.length > 2) {
        let colSet = new Set();
        buffer.forEach(([r, c]) => {
          colSet.add(c);
          GRID[r][c] = null;
        });
        settle(colSet);
        renderGrid();
        increaseScore(100);
        popAndSettle();

        buffer = [];
      } else if (GRID[i][j] != null) {
        buffer = [];

        buffer.push([i, j]);
      }
    }
    if (buffer.length > 2) {
      let colSet = new Set();

      buffer.forEach(([r, c]) => {
        colSet.add(c);

        GRID[r][c] = null;
      });
      settle(colSet);
      renderGrid;
      increaseScore(100);
      popAndSettle();
    }
  }
  // Horizontal Popping

  GRID.forEach((row, i) => {
    let buffer = [];
    row.forEach((cell, j) => {
      if (GRID[i][j] === GRID?.[i]?.[j - 1] && GRID[i][j] != null) {
        buffer.push([i, j]);
      } else if (buffer.length > 2) {
        let colSet = new Set();
        buffer.forEach(([r, c]) => {
          colSet.add(c);
          GRID[r][c] = null;
        });
        settle(colSet);
        renderGrid();
        increaseScore(100);
        popAndSettle();
        buffer = [];
      } else if (GRID[i][j] != null) {
        buffer = [];
        buffer.push([i, j]);
      }
    });
    if (buffer.length > 2) {
      let colSet = new Set();

      buffer.forEach(([r, c]) => {
        colSet.add(c);
        GRID[r][c] = null;
      });
      settle(colSet);
      renderGrid();
      increaseScore(100);
      popAndSettle();
    }
  });

  renderGrid();
}

// function settle(r,c) {
//   for (let j = 0; j < GRID[0].length; j++) {
//     let count = 0;

//     for (let i = GRID.length - 1; i >= 0; i--) {
//       if (GRID[i][j] == null) {
//         count++;
//       } else {
//         GRID[i + count][j] = GRID[i][j];
//         if (count) {
//           GRID[i][j] = null;
//         }
//       }
//     }
//   }
// }
function settle(col) {
  console.log(col);
  // for (let j = 0; j < GRID[0].length; j++) {
  col.forEach((j) => {
    let count = 0;
    for (let i = GRID.length - 1; i >= 0; i--) {
      if (GRID[i][j] == null) {
        count++;
      } else {
        GRID[i + count][j] = GRID[i][j];
        if (count) {
          GRID[i][j] = null;
        }
      }
    }
  });
}
function increaseScore(si) {
  score = score + si;
  SCORE_ELEMENT.textContent = score;
}

document.addEventListener("keydown", function (event) {
  console.log(fallingCubesIndexes, "before");

  if (event.key === "ArrowLeft") {
    moveLeft();
    renderGrid();
  } else if (event.key === "ArrowRight") {
    moveRight();
    renderGrid();
  } else if (event.key === "ArrowUp") {
    console.log("up");
    moveUp();
    renderGrid();
  }
  console.log(fallingCubesIndexes, "after");
});

function moveLeft() {
  console.log("called");
  if (fallingCubesIndexes) {
    if (canGoLeft()) {
      fallingCubesIndexes.map(([r, c, color]) => {
        GRID[r][c] = null;
      });
      fallingCubesIndexes = fallingCubesIndexes.map(([r, c, color]) => {
        GRID[r][c] = null;
        GRID[r][c - 1] = color;

        return [r, c - 1, color];
      });
    }
  }
}
function moveRight() {
  if (fallingCubesIndexes) {
    if (canGoRight()) {
      fallingCubesIndexes.map(([r, c, color]) => {
        GRID[r][c] = null;
      });
      fallingCubesIndexes = fallingCubesIndexes.map(([r, c, color]) => {
        GRID[r][c + 1] = color;
        return [r, c + 1, color];
      });
    }
  }
}

 

renderGrid();

function generateRandomColor() {
  const colors = ["blue", "red", "yellow", "purple", "green"];
  // const colors = ["yellow", "yellow", "yellow", "yellow", "yellow"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function generateFallingCubes() {
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
      (indexes.length === 3 && Math.random() > 0.7)
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
  };

  chooseAdjacentIndex(startingRowIndex, startingColIndex);

  return indexes;
}
function isGameFinished() {
  return GRID[0].some((cell) => {
    if (cell) {
      return true;
    } else return false;
  });
}

function getBottomMostCells(matrix) {
  let bm = [];
  let found = false;

  for (let j = 0; j <= 8; j++) {
    for (let i = 15; i >= 0; i--) {
      matrix.forEach((item) => {
        if (item[0] === i && item[1] === j && !found) {
          bm.push(item);
          found = true;
        }
      });
      if (found) break;
    }
    found = false;
  }

  return bm;
}

function canGoLeft(){
  for (const [r, c, color] of fallingCubesIndexes) {
    if (c <1) {
      return false;
    }
  }
  let leftMostCells = [];
  let found = false;

  for (let i = 15; i >= 0; i--) {
    for (let j = 0; j <=8; j++) {
      fallingCubesIndexes.forEach((item) => {
        if (item[0] === i && item[1] === j) {
          leftMostCells.push(item);
          found = true;
        }
      });
      if (found) break;
    }
    found = false;
  }
  return leftMostCells.every(([r, c]) => {
    if (GRID[r][c -1] == null) {
      return true;
    }
    return false
  });
}

function canGoRight() {
  for (const [r, c, color] of fallingCubesIndexes) {
    if (c > 7) {
      return false;
    }
  }
  let rightMostCells = [];
  let found = false;

  for (let i = 15; i >= 0; i--) {
    for (let j = 8; j >= 0; j--) {
      fallingCubesIndexes.forEach((item) => {
        if (item[0] === i && item[1] === j) {
          rightMostCells.push(item);
          found = true;
        }
      });
      if (found) break;
    }
    found = false;
  }
  return rightMostCells.every(([r, c]) => {
    if (GRID[r][c + 1] == null) {
      return true;
    }
    return false
  });
}
