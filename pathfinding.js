// A grid definiálása, ahol az akadályok és szobák vannak
const grid = [
  ["X", "info6", "X", "X", "cad", "X", "X", "mat3", "X", "mat2", "X", "X", "X", "X","X",],
  ["lepcso", "", "", "", "", "", "", "", "", ""],
  ["X", "", "X", "X", "X", "X", "X", "X", "nylab", "X"],
  ["HBej", "", "tori", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];

const rows = grid.length;
const cols = grid[0].length;

// Szobák koordinátái
const rooms = {
  info6: [0, 1],
  cad: [0, 4],
  mat3: [0, 7],
  mat2: [0, 9],
  nylab: [2, 8],
  tori: [3, 2],
  lepcso: [1, 0],
};

function getRoomCoordinates(roomName) {
  return rooms[roomName.toLowerCase()];
}

function isValidCell(x, y) {
  return x >= 0 && y >= 0 && x < rows && y < cols && grid[x][y] !== "X";
}

function isStartOrEndValid(x, y) {
  return isValidCell(x, y);
}

function getNeighbors(x, y) {
  const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
  ];
  const neighbors = [];
  directions.forEach(([dx, dy]) => {
      if (isValidCell(x + dx, y + dy)) {
          neighbors.push([x + dx, y + dy]);
      }
  });
  return neighbors;
}

function findPath(start, end) {
  const [sx, sy] = start;
  const [ex, ey] = end;

  const openSet = [[sx, sy]];
  const cameFrom = {};
  const gScore = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));
  const fScore = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));

  gScore[sx][sy] = 0;
  fScore[sx][sy] = Math.abs(sx - ex) + Math.abs(sy - ey);

  while (openSet.length > 0) {
      openSet.sort((a, b) => fScore[a[0]][a[1]] - fScore[b[0]][b[1]]);
      const [cx, cy] = openSet.shift();

      if (cx === ex && cy === ey) {
          const path = [];
          let current = `${cx},${cy}`;
          while (current) {
              const [px, py] = current.split(",").map(Number);
              path.push([px, py]);
              current = cameFrom[current];
          }

          // Takarítsd fel a memóriát
          openSet.length = 0;
          Object.keys(cameFrom).forEach(key => delete cameFrom[key]);
          return path.reverse();
      }

      getNeighbors(cx, cy).forEach(([nx, ny]) => {
          const tentativeGScore = gScore[cx][cy] + 1;
          if (tentativeGScore < gScore[nx][ny]) {
              cameFrom[`${nx},${ny}`] = `${cx},${cy}`;
              gScore[nx][ny] = tentativeGScore;
              fScore[nx][ny] = gScore[nx][ny] + Math.abs(nx - ex) + Math.abs(ny - ey);
              if (!openSet.some(([ox, oy]) => ox === nx && oy === ny)) {
                  openSet.push([nx, ny]);
              }
          }
      });
  }

  // Memória tisztítása, ha nem találódott út
  openSet.length = 0;
  Object.keys(cameFrom).forEach(key => delete cameFrom[key]);
  return null;
}

function renderGrid() {
  const gridElement = document.getElementById("grid");

  // Meglévő elemek eltávolítása
  while (gridElement.firstChild) {
      gridElement.removeChild(gridElement.firstChild);
  }

  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");

          if (grid[r][c] !== "X" && grid[r][c] !== "") {
              cell.textContent = grid[r][c];
          }

          if (grid[r][c] === "X") {
              cell.classList.add("obstacle");
          }

          gridElement.appendChild(cell);
      }
  }
}

function drawPathLine(path) {
  const gridElement = document.getElementById("grid");

  // Előző vonal törlése
  const existingCanvas = document.querySelector("#grid canvas");
  if (existingCanvas) {
      existingCanvas.remove();
  }

  const lineCanvas = document.createElement("canvas");
  lineCanvas.width = gridElement.offsetWidth;
  lineCanvas.height = gridElement.offsetHeight;
  lineCanvas.style.position = "absolute";
  lineCanvas.style.top = gridElement.offsetTop + "px";
  lineCanvas.style.left = gridElement.offsetLeft + "px";
  lineCanvas.style.pointerEvents = "none";
  gridElement.appendChild(lineCanvas);

  const ctx = lineCanvas.getContext("2d");
  ctx.strokeStyle = "lightgreen";
  ctx.lineWidth = 3;
  ctx.beginPath();

  path.forEach(([x, y], index) => {
      const cell = gridElement.children[x * cols + y];
      const rect = cell.getBoundingClientRect();
      const gridRect = gridElement.getBoundingClientRect();
      const cellCenterX = rect.left + rect.width / 2 - gridRect.left;
      const cellCenterY = rect.top + rect.height / 2 - gridRect.top;

      if (index === 0) {
          ctx.moveTo(cellCenterX, cellCenterY);
      } else {
          ctx.lineTo(cellCenterX, cellCenterY);
      }
  });

  ctx.stroke();
}

function runPathfinding() {
  const startInput = getRoomCoordinates(document.getElementById("start").value);
  const endInput = getRoomCoordinates(document.getElementById("end").value);

  if (!startInput || !endInput) {
      alert("Érvénytelen szoba");
      return;
  }

  if (!isStartOrEndValid(startInput[0], startInput[1])) {
      alert("Helytelen indulási hely");
      return;
  }
  if (!isStartOrEndValid(endInput[0], endInput[1])) {
      alert("Helytelen cél");
      return;
  }

  const path = findPath(startInput, endInput);
  if (!path) {
      alert("Nem található útvonal");
      return;
  }

  renderGrid();
  drawPathLine(path);
}

renderGrid();
