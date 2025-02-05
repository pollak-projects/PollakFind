// Alapadatok
const gridSize = 20;
// Ezek a nyilacska emoji-k jelölik a lépcsőket
const allowedStairs = ["⬇️", "➡️", "⬆️", "⬅️"];

// Eredeti cellNames (floor 0 “rooms” and obstacles)
let cellNames = {
  "cell-0-0": "X",
  "cell-0-1": "Chill",
  "cell-0-2": "",
  "cell-0-3": "Szekr",
  "cell-0-4": "",
  "cell-0-5": "",
  "cell-0-6": "X",
  "cell-0-7": "X",
  "cell-0-8": "X",
  "cell-0-9": "X",
  "cell-0-10": "X",
  "cell-0-11": "X",
  "cell-0-12": "X",
  "cell-0-13": "X",
  "cell-0-14": "X",
  "cell-0-15": "X",
  "cell-0-16": "X",
  "cell-0-17": "SzerT",
  "cell-0-18": "NőiM",
  "cell-0-19": "X",

  "cell-1-0": "X",
  "cell-1-1": "Büfé",
  "cell-1-2": "",
  "cell-1-3": "",
  "cell-1-4": "Aszt",
  "cell-1-5": "",
  "cell-1-6": "X",
  "cell-1-7": "X",
  "cell-1-8": "X",
  "cell-1-9": "X",
  "cell-1-10": "X",
  "cell-1-11": "X",
  "cell-1-12": "X",
  "cell-1-13": "X",
  "cell-1-14": "X",
  "cell-1-15": "X",
  "cell-1-16": "Tört",
  "cell-1-17": "",
  "cell-1-18": "",
  "cell-1-19": "HBej",

  "cell-2-0": "X",
  "cell-2-1": "X",
  "cell-2-2": "",
  "cell-2-3": "",
  "cell-2-4": "X",
  "cell-2-5": "",
  "cell-2-6": "X",
  "cell-2-7": "X",
  "cell-2-8": "X",
  "cell-2-9": "X",
  "cell-2-10": "X",
  "cell-2-11": "X",
  "cell-2-12": "X",
  "cell-2-13": "X",
  "cell-2-14": "X",
  "cell-2-15": "X",
  "cell-2-16": "X",
  "cell-2-17": "",
  "cell-2-18": "",
  "cell-2-19": "X",

  "cell-3-0": "X",
  "cell-3-1": "",
  "cell-3-2": "",
  "cell-3-3": "",
  "cell-3-4": "",
  "cell-3-5": "",
  "cell-3-6": "",
  "cell-3-7": "",
  "cell-3-8": "",
  "cell-3-9": "",
  "cell-3-10": "",
  "cell-3-11": "",
  "cell-3-12": "",
  "cell-3-13": "",
  "cell-3-14": "",
  "cell-3-15": "",
  "cell-3-16": "",
  "cell-3-17": "",
  "cell-3-18": "",
  "cell-3-19": "➡️",

  "cell-4-0": "X",
  "cell-4-1": "⬇️",
  "cell-4-2": "X",
  "cell-4-3": "FőBej",
  "cell-4-4": "X",
  "cell-4-5": "X",
  "cell-4-6": "X",
  "cell-4-7": "Mat2",
  "cell-4-8": "X",
  "cell-4-9": "Mat3",
  "cell-4-10": "X",
  "cell-4-11": "X",
  "cell-4-12": "X",
  "cell-4-13": "X",
  "cell-4-14": "CadC",
  "cell-4-15": "X",
  "cell-4-16": "X",
  "cell-4-17": "X",
  "cell-4-18": "Inf-6",
  "cell-4-19": "X"
};

// Define original floors: floor 0 and floor 1 are provided.
// We add a new floor (floor 2) by copying floor 1 (you can customize it as needed).
const originalFloors = {
  0: { ...cellNames },
  1: {
    "cell-0-0": "X",
    "cell-0-1": "Chill",
    "cell-0-2": "",
    "cell-0-3": "Szekr",
    "cell-0-4": "",
    "cell-0-5": "",
    "cell-0-6": "X",
    "cell-0-7": "X",
    "cell-0-8": "X",
    "cell-0-9": "X",
    "cell-0-10": "X",
    "cell-0-11": "X",
    "cell-0-12": "X",
    "cell-0-13": "X",
    "cell-0-14": "X",
    "cell-0-15": "X",
    "cell-0-16": "X",
    "cell-0-17": "SzerT",
    "cell-0-18": "NőiM",
    "cell-0-19": "X",

    "cell-1-0": "X",
    "cell-1-1": "Büfé",
    "cell-1-2": "",
    "cell-1-3": "",
    "cell-1-4": "Aszt",
    "cell-1-5": "",
    "cell-1-6": "X",
    "cell-1-7": "X",
    "cell-1-8": "X",
    "cell-1-9": "X",
    "cell-1-10": "X",
    "cell-1-11": "X",
    "cell-1-12": "X",
    "cell-1-13": "X",
    "cell-1-14": "X",
    "cell-1-15": "X",
    "cell-1-16": "Tört",
    "cell-1-17": "",
    "cell-1-18": "",
    "cell-1-19": "HBej",

    "cell-2-0": "X",
    "cell-2-1": "X",
    "cell-2-2": "",
    "cell-2-3": "",
    "cell-2-4": "X",
    "cell-2-5": "",
    "cell-2-6": "X",
    "cell-2-7": "X",
    "cell-2-8": "X",
    "cell-2-9": "X",
    "cell-2-10": "X",
    "cell-2-11": "X",
    "cell-2-12": "X",
    "cell-2-13": "X",
    "cell-2-14": "X",
    "cell-2-15": "X",
    "cell-2-16": "X",
    "cell-2-17": "",
    "cell-2-18": "",
    "cell-2-19": "X",

    "cell-3-0": "X",
    "cell-3-1": "",
    "cell-3-2": "",
    "cell-3-3": "",
    "cell-3-4": "",
    "cell-3-5": "",
    "cell-3-6": "",
    "cell-3-7": "",
    "cell-3-8": "",
    "cell-3-9": "",
    "cell-3-10": "",
    "cell-3-11": "",
    "cell-3-12": "",
    "cell-3-13": "",
    "cell-3-14": "",
    "cell-3-15": "",
    "cell-3-16": "",
    "cell-3-17": "",
    "cell-3-18": "",
    "cell-3-19": "➡️",

    "cell-4-0": "X",
    "cell-4-1": "⬇️",
    "cell-4-2": "X",
    "cell-4-3": "FőBej",
    "cell-4-4": "X",
    "cell-4-5": "X",
    "cell-4-6": "X",
    "cell-4-7": "Mat2",
    "cell-4-8": "X",
    "cell-4-9": "Mat3",
    "cell-4-10": "X",
    "cell-4-11": "X",
    "cell-4-12": "X",
    "cell-4-13": "X",
    "cell-4-14": "CadC",
    "cell-4-15": "X",
    "cell-4-16": "X",
    "cell-4-17": "X",
    "cell-4-18": "LMAO",
    "cell-4-19": "X"
  },
  // Floor 2 is a new floor – here we copy floor 1 for demonstration (customize as needed)
  2: {
    "cell-0-0": "X",
    "cell-0-1": "Chill",
    "cell-0-2": "",
    "cell-0-3": "Szekr",
    "cell-0-4": "",
    "cell-0-5": "",
    "cell-0-6": "X",
    "cell-0-7": "X",
    "cell-0-8": "X",
    "cell-0-9": "X",
    "cell-0-10": "X",
    "cell-0-11": "X",
    "cell-0-12": "X",
    "cell-0-13": "X",
    "cell-0-14": "X",
    "cell-0-15": "X",
    "cell-0-16": "X",
    "cell-0-17": "SzerT",
    "cell-0-18": "NőiM",
    "cell-0-19": "X",

    "cell-1-0": "X",
    "cell-1-1": "Büfé",
    "cell-1-2": "",
    "cell-1-3": "",
    "cell-1-4": "Info VI",
    "cell-1-5": "",
    "cell-1-6": "X",
    "cell-1-7": "X",
    "cell-1-8": "X",
    "cell-1-9": "X",
    "cell-1-10": "X",
    "cell-1-11": "X",
    "cell-1-12": "X",
    "cell-1-13": "X",
    "cell-1-14": "X",
    "cell-1-15": "X",
    "cell-1-16": "Tört",
    "cell-1-17": "",
    "cell-1-18": "",
    "cell-1-19": "HBej",

    "cell-2-0": "X",
    "cell-2-1": "X",
    "cell-2-2": "",
    "cell-2-3": "",
    "cell-2-4": "X",
    "cell-2-5": "",
    "cell-2-6": "X",
    "cell-2-7": "X",
    "cell-2-8": "X",
    "cell-2-9": "X",
    "cell-2-10": "X",
    "cell-2-11": "X",
    "cell-2-12": "X",
    "cell-2-13": "X",
    "cell-2-14": "X",
    "cell-2-15": "X",
    "cell-2-16": "X",
    "cell-2-17": "",
    "cell-2-18": "",
    "cell-2-19": "X",

    "cell-3-0": "X",
    "cell-3-1": "",
    "cell-3-2": "",
    "cell-3-3": "",
    "cell-3-4": "",
    "cell-3-5": "",
    "cell-3-6": "",
    "cell-3-7": "",
    "cell-3-8": "",
    "cell-3-9": "",
    "cell-3-10": "",
    "cell-3-11": "",
    "cell-3-12": "",
    "cell-3-13": "",
    "cell-3-14": "",
    "cell-3-15": "",
    "cell-3-16": "",
    "cell-3-17": "",
    "cell-3-18": "",
    "cell-3-19": "➡️",

    "cell-4-0": "X",
    "cell-4-1": "⬇️",
    "cell-4-2": "X",
    "cell-4-3": "FőBej",
    "cell-4-4": "X",
    "cell-4-5": "X",
    "cell-4-6": "X",
    "cell-4-7": "Mat2",
    "cell-4-8": "X",
    "cell-4-9": "Mat3",
    "cell-4-10": "X",
    "cell-4-11": "X",
    "cell-4-12": "X",
    "cell-4-13": "X",
    "cell-4-14": "CadC",
    "cell-4-15": "X",
    "cell-4-16": "X",
    "cell-4-17": "X",
    "cell-4-18": "LMAO",
    "cell-4-19": "X"
  }
};

// --- Add Corridor to Every Floor ---
// For each floor in originalFloors, add a corridor row at the top
function addCorridor(floorData) {
  let newFloor = {};
  // Create corridor row: all cells in row 0 are empty
  for (let col = 0; col < gridSize; col++) {
    newFloor[`cell-0-${col}`] = "";
  }
  // Shift every cell down by 1 row
  for (let key in floorData) {
    if (key.startsWith("cell-")) {
      const parts = key.split("-");
      const row = parseInt(parts[1], 10);
      const col = parts[2];
      newFloor[`cell-${row + 1}-${col}`] = floorData[key];
    }
  }
  newFloor.corridorAdded = true;
  return newFloor;
}

// Process each floor to include the corridor row
let floors = {};
for (let fl in originalFloors) {
  floors[fl] = addCorridor(originalFloors[fl]);
}

// Helper: Calculate the number of rows for a floor by checking keys.
function getRowCountForFloor(floor) {
  const keys = Object.keys  (floors[floor]).filter(key => key.startsWith("cell-"));
  let maxRow = 0;
  keys.forEach(key => {
    const parts = key.split("-");
    const row = parseInt(parts[1], 10);
    if (row > maxRow) maxRow = row;
  });
  return maxRow + 1;
}

let currentFloor = 0;
let grid = [];
let currentPath = [];

// Grid creation using dynamic row count
function createGrid(columns) {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";
  grid = [];
  const numRows = getRowCountForFloor(currentFloor);
  for (let row = 0; row < numRows; row++) {
    let rowArray = [];
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement("div");
      const cellId = `cell-${row}-${col}`;
      cell.id = cellId;
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      
      const key = `cell-${row}-${col}`;
      if (floors[currentFloor][key]) {
        const name = floors[currentFloor][key];
        if (name === "X") {
          cell.classList.add("black");
          cell.innerText = "";
        } else {
          cell.innerText = name;
        }
      }
      
      if (currentPath.some(n => n.floor === currentFloor && n.row === row && n.col === col)) {
        cell.classList.add("path");
      }
      
      rowArray.push(cell);
      gridElement.appendChild(cell);
    }
    grid.push(rowArray);
  }
}

// Floor switch function – supports floors 0, 1, and 2.
function switchFloor(floor) {
  if (floors[floor]) {
    currentFloor = floor;
    createGrid(gridSize);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  createGrid(gridSize);

  // Drag & drop for grid
  const gridElement = document.getElementById("grid");
  let isDragging = false, offsetX, offsetY;
  gridElement.addEventListener("mousedown", function(event) {
    isDragging = true;
    offsetX = event.clientX - gridElement.offsetLeft;
    offsetY = event.clientY - gridElement.offsetTop;
    gridElement.style.cursor = "grabbing";
  });
  document.addEventListener("mousemove", function(event) {
    if (isDragging) {
      let newLeft = event.clientX - offsetX;
      if (newLeft < 300) newLeft = 300;
      gridElement.style.left = `${newLeft}px`;
      gridElement.style.top = `${event.clientY - offsetY}px`;
    }
  });
  document.addEventListener("mouseup", function() {
    isDragging = false;
    gridElement.style.cursor = "grab";
  });
  window.resetGridPosition = function() {
    gridElement.style.left = "300px";
    gridElement.style.top = "20px";
  };

  // Floor selector including floors 0, 1, and 2
  const floorSelector = document.createElement("select");
  floorSelector.id = "floorSelect";
  floorSelector.innerHTML = `<option value="0">Földszint</option>
                             <option value="1">1. Emelet</option>
                             <option value="2">2. Emelet</option>`;
  floorSelector.addEventListener("change", (e) => switchFloor(parseInt(e.target.value)));
  document.querySelector(".left-panel").appendChild(floorSelector);
});

// Utility: getCell for a given floor, row, and column
function getCell(floor, row, col) {
  const key = `cell-${row}-${col}`;
  return floors[floor][key] || "";
}

// Check if a cell is blocked (obstacle) – used by the pathfinding
function isBlocked(floor, row, col, startName, endName) {
  const cell = getCell(floor, row, col);
  if (cell === "X") return true;
  if (cell !== "" && !allowedStairs.includes(cell) && cell !== startName && cell !== endName) {
    return true;
  }
  return false;
}

// Generate neighbors for the A* algorithm
function getNeighbors(node, startName, endName) {
  const { floor, row, col } = node;
  const neighbors = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
  const numRows = getRowCountForFloor(floor);
  directions.forEach(([dRow, dCol]) => {
    const nRow = row + dRow;
    const nCol = col + dCol;
    if (nRow >= 0 && nRow < numRows && nCol >= 0 && nCol < gridSize) {
      if (!isBlocked(floor, nRow, nCol, startName, endName)) {
        neighbors.push({ floor, row: nRow, col: nCol });
      }
    }
  });
  // Allow floor changes via stairs
  if (allowedStairs.includes(getCell(floor, row, col))) {
    [floor - 1, floor + 1].forEach(newFloor => {
      if (floors[newFloor] && allowedStairs.includes(getCell(newFloor, row, col))) {
        neighbors.push({ floor: newFloor, row, col });
      }
    });
  }
  return neighbors;
}

// Manhattan distance heuristic (including floor difference)
function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) + Math.abs(a.floor - b.floor);
}

// Multi-floor A* algorithm
function multiFloorAStar(startPos, endPos, startName, endName) {
  const openList = [];
  const closedSet = new Set();
  const gScore = {};
  const fScore = {};
  const parent = {};

  function nodeKey(node) {
    return `${node.floor}-${node.row}-${node.col}`;
  }

  const startKey = nodeKey(startPos);
  gScore[startKey] = 0;
  fScore[startKey] = heuristic(startPos, endPos);
  openList.push(startPos);

  while (openList.length) {
    let current = openList.reduce((best, node) =>
      fScore[nodeKey(node)] < fScore[nodeKey(best)] ? node : best
    );
    if (current.floor === endPos.floor && current.row === endPos.row && current.col === endPos.col) {
      return reconstructPath(parent, current);
    }
    const currentKey = nodeKey(current);
    openList.splice(openList.indexOf(current), 1);
    closedSet.add(currentKey);

    const neighbors = getNeighbors(current, startName, endName);
    neighbors.forEach(neighbor => {
      const neighborKey = nodeKey(neighbor);
      if (closedSet.has(neighborKey)) return;
      const tentativeG = gScore[currentKey] + 1;
      if (tentativeG < (gScore[neighborKey] || Infinity)) {
        parent[neighborKey] = current;
        gScore[neighborKey] = tentativeG;
        fScore[neighborKey] = tentativeG + heuristic(neighbor, endPos);
        if (!openList.some(n => nodeKey(n) === neighborKey)) {
          openList.push(neighbor);
        }
      }
    });
  }
  return []; // Útvonal nem található
}

function reconstructPath(parent, current) {
  const path = [];
  function nodeKey(node) {
    return `${node.floor}-${node.row}-${node.col}`;
  }
  while (current) {
    path.push(current);
    current = parent[nodeKey(current)];
  }
  return path.reverse();
}

// Multi-floor pathfinding entry function
function runPathfinding() {
  const startName = document.getElementById("start").value;
  const endName = document.getElementById("end").value;

  function findNodeByName(name) {
    for (let fl in floors) {
      const numRows = getRowCountForFloor(parseInt(fl));
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (getCell(parseInt(fl), row, col) === name) {
            return { floor: parseInt(fl), row, col };
          }
        }
      }
    }
    return null;
  }

  const startPos = findNodeByName(startName);
  const endPos = findNodeByName(endName);

  if (!startPos || !endPos) {
    alert("Nem található az indulási vagy célterem!");
    return;
  }

  currentPath = multiFloorAStar(startPos, endPos, startName, endName);
  createGrid(gridSize);

  if (currentPath.length === 0) {
    alert("Nincs útvonal a kiválasztott pontok között!");
  }
}
 




