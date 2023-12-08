function makeGrid() {
  //create a grid of 10x10
}
const playGround = document.querySelector(".ground");
console.log(playGround)
function renderGrid() {
  for (let i = 0; i <= 15; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 9; j++) {
      const singleBox = document.createElement("div");
      singleBox.classList.add("singleBox");
      row.appendChild(singleBox);
    }
    playGround.appendChild(row);
  }
}
renderGrid()