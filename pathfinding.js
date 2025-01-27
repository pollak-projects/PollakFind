// A grid definiálása, ahol az akadályok és szobák vannak
const grid = [
    ["X", "info6", "X", "X", "cad", "X", "X", "mat3", "X", "mat2"],
    ["lepcso", "", "", "", "", "", "", "", "", ""],
    ["X", "", "X", "X", "X", "X", "X", "X", "nylab", "X"],
    ["HBej", "", "tori", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
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
    lepcso: [1, 0]
  };
  
  function getRoomCoordinates(roomName) {
    return rooms[roomName.toLowerCase()];
  }
  
  function isValidCell(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols && grid[x][y] !== "X";
  }
  
  function getNeighbors(x, y) {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
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
  
        return path.reverse();
      }
  
      getNeighbors(cx, cy).forEach(([nx, ny]) => {
        const tentativeGScore = gScore[cx][cy] + 1;
        if (tentativeGScore < gScore[nx][ny]) {
          cameFrom[`${nx},${ny}`] = `${cx},${cy}`;
          gScore[nx][ny] = tentativeGScore;
          fScore[nx][ny] =
            gScore[nx][ny] + Math.abs(nx - ex) + Math.abs(ny - ey);
          if (!openSet.some(([ox, oy]) => ox === nx && oy === ny)) {
            openSet.push([nx, ny]);
          }
        }
      });
    }
  
    return null;
  }
  
  function renderGrid() {
    const gridElement = document.getElementById("grid");
  
    // Meglévő elemek eltávolítása
    while (gridElement.firstChild) {
      gridElement.removeChild(gridElement.firstChild);
    }
  
    grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        const cellElement = document.createElement("div");
        cellElement.textContent = cell === "" ? "" : cell;
  
        if (cell === "X") {
          cellElement.classList.add("obstacle");
        } else if (cell === "info6") {
          cellElement.classList.add("start");
        } else if (cell === "cad") {
          cellElement.classList.add("end");
        }
        gridElement.appendChild(cellElement);
      });
    });
  }
  
  function drawPathLine(path) {
    const gridElement = document.getElementById("grid");
  
    const existingCanvas = document.querySelector("#grid canvas");
    if (existingCanvas) {
      existingCanvas.remove();
    }
  
    const lineCanvas = document.createElement("canvas");
    lineCanvas.width = gridElement.offsetWidth;
    lineCanvas.height = gridElement.offsetHeight;
    lineCanvas.style.position = "absolute";
    lineCanvas.style.top = "0";
    lineCanvas.style.left = "0";
    lineCanvas.style.pointerEvents = "none";
    gridElement.appendChild(lineCanvas);
  
    const ctx = lineCanvas.getContext("2d");
    ctx.strokeStyle = "#f39c12";
    ctx.lineWidth = 4;
  
    let currentStep = 0;
  
    function animateLine() {
      if (currentStep >= path.length - 1) return;
  
      const [x1, y1] = path[currentStep];
      const [x2, y2] = path[currentStep + 1];
  
      const cell1 = gridElement.children[x1 * cols + y1];
      const cell2 = gridElement.children[x2 * cols + y2];
  
      const gridRect = gridElement.getBoundingClientRect();
      const startX =
        cell1.getBoundingClientRect().left + (cell1.offsetWidth / 2) - gridRect.left;
      const startY =
        cell1.getBoundingClientRect().top + (cell1.offsetHeight / 2) - gridRect.top;
      const endX =
        cell2.getBoundingClientRect().left + (cell2.offsetWidth / 2) - gridRect.left;
      const endY =
        cell2.getBoundingClientRect().top + (cell2.offsetHeight / 2) - gridRect.top;
  
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
  
      currentStep++;
      requestAnimationFrame(animateLine);
    }
  
    animateLine();
  }
  
  function runPathfinding() {
    const startSelect = document.getElementById("start");
    const endSelect = document.getElementById("end");
  
    const startRoom = startSelect.value;
    const endRoom = endSelect.value;
  
    const start = getRoomCoordinates(startRoom);
    const end = getRoomCoordinates(endRoom);
  
    if (!start || !end) {
      alert("Érvénytelen helyet választottál!");
      return;
    }
  
    renderGrid();
    const path = findPath(start, end);
    if (path) {
      drawPathLine(path);
    } else {
      alert("Nincs elérhető útvonal!");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => renderGrid());
  