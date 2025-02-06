// Alapadatok
const gridSize = 20;
// Ezek a nyilacska emoji-k jelölik a lépcsőket
const allowedStairs = ["⬇️", "➡️", "⬆️", "⬅️"];

// További emeletek (példa: 1. emelet)
const floors = {
  0: {
    "cell-0-0": "X",
    "cell-0-1": "Chill",
    "cell-0-2": "",
    "cell-0-3": "",
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
    "cell-1-4": "",
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
    "cell-1-16": "I. Tant.",
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

    "cell-3-0": "Játék",
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
    "cell-4-1": "X",
    "cell-4-2": "⬇️",
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
    "cell-4-18": "Info VI",
    "cell-4-19": "X",
  },
  1: {
    "cell-0-0": "X",
    "cell-0-1": "X",
    "cell-0-2": "X",
    "cell-0-3": "X",
    "cell-0-4": "X",
    "cell-0-5": "X",
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
    "cell-0-17": "X",
    "cell-0-18": "X",
    "cell-0-19": "X",

    "cell-1-0": "X",
    "cell-1-1": "X",
    "cell-1-2": "X",
    "cell-1-3": "X",
    "cell-1-4": "X",
    "cell-1-5": "X",
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
    "cell-1-16": "X",
    "cell-1-17": "Info II",
    "cell-1-18": "",
    "cell-1-19": "X",

    "cell-2-0": "Igazg.",
    "cell-2-1": "Titk",
    "cell-2-2": "Tanári",
    "cell-2-3": "X",
    "cell-2-4": "X",
    "cell-2-5": "Info III",
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
    "cell-2-17": "X",
    "cell-2-18": "Info I",
    "cell-2-19": "X",

    "cell-3-0": "",
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

    "cell-4-0": "Nwc1",
    "cell-4-1": "Fwc1",
    "cell-4-2": "⬇️",
    "cell-4-3": "Gaz.ir",
    "cell-4-4": "V. Tant.",
    "cell-4-5": "X",
    "cell-4-6": "Kajtor",
    "cell-4-7": "X",
    "cell-4-8": "X",
    "cell-4-9": "X",
    "cell-4-10": "Info VII",
    "cell-4-11": "X",
    "cell-4-12": "X",
    "cell-4-13": "X",
    "cell-4-14": "Info V",
    "cell-4-15": "X",
    "cell-4-16": "X",
    "cell-4-17": "X",
    "cell-4-18": "Info IV",
    "cell-4-19": "X",
  },
};

let currentFloor = 0;
let grid = [];
// Eltároljuk a jelenlegi útvonalat, hogy minden emelet váltásnál meg tudjuk jeleníteni a megfelelő részt
let currentPath = [];

// Grid létrehozása
function createGrid(columns) {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = ""; // Előző grid törlése
  grid = [];
  const rows = Math.ceil(100 / columns);
  for (let row = 0; row < rows; row++) {
    let rowArray = [];
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement("div");
      const cellId = `cell-${row}-${col}`;
      cell.id = cellId;
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);

      // Prevent text selection on the cell
      cell.style.userSelect = "none";

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

      // Ha a jelenlegi útvonal tartalmazza ezt a cellát, jelöljük
      if (
        currentPath.some(
          (n) => n.floor === currentFloor && n.row === row && n.col === col
        )
      ) {
        cell.classList.add("path");
      }

      rowArray.push(cell);
      gridElement.appendChild(cell);
    }
    grid.push(rowArray);
  }
}

// Emelet váltása dropdown segítségével
function switchFloor(floor) {
  if (floors[floor]) {
    currentFloor = floor;
    createGrid(gridSize);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createGrid(gridSize);

  function isMobileView() {
    return window.innerWidth <= 768;
  }

  function setupDesktop() {
    const gridElement = document.getElementById("grid");
    let isDragging = false,
      offsetX,
      offsetY;
    gridElement.style.cursor = "grab";

    gridElement.addEventListener("mousedown", function (event) {
      isDragging = true;
      offsetX = event.clientX - gridElement.offsetLeft;
      offsetY = event.clientY - gridElement.offsetTop;
      gridElement.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (event) {
      if (isDragging) {
        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;
        // Calculate boundaries so the grid stays within the viewport
        const minLeft = 0;
        const minTop = 0;
        const maxLeft = window.innerWidth - gridElement.offsetWidth;
        const maxTop = window.innerHeight - gridElement.offsetHeight;

        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
        newTop = Math.max(minTop, Math.min(newTop, maxTop));

        gridElement.style.left = `${newLeft}px`;
        gridElement.style.top = `${newTop}px`;
      }
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
      gridElement.style.cursor = "grab";
    });

    window.resetGridPosition = function () {
      const gridElement = document.getElementById("grid");
      gridElement.style.left = "500px";
      gridElement.style.top = "300px";
      // Clear the current path and re-create the grid
      currentPath = [];
      createGrid(gridSize);
    };

    if (!document.getElementById("floorSelect")) {
      const floorSelector = document.createElement("select");
      floorSelector.id = "floorSelect";
      floorSelector.innerHTML = `<option value="0">Földszint</option>
                                 <option value="1">1. Emelet</option>`;
      floorSelector.addEventListener("change", (e) =>
        switchFloor(parseInt(e.target.value))
      );
      document.querySelector(".left-panel").appendChild(floorSelector);
    }
  }

  function setupMobile() {
    if (!document.querySelector(".mobile-floor-nav")) {
      const mobileNav = document.createElement("div");
      mobileNav.classList.add("mobile-floor-nav");
      mobileNav.innerHTML = `
        <button id="prevFloor">&larr;</button>
        <span id="currentFloorLabel">Emelet: ${
          currentFloor === 0 ? "Földszint" : currentFloor + ". Emelet"
        }</span>
        <button id="nextFloor">&rarr;</button>
      `;
      document.body.appendChild(mobileNav);
      document
        .getElementById("prevFloor")
        .addEventListener("click", function () {
          if (floors[currentFloor - 1] !== undefined) {
            currentFloor = currentFloor - 1;
            switchFloor(currentFloor);
            updateFloorLabel();
          }
        });
      document
        .getElementById("nextFloor")
        .addEventListener("click", function () {
          if (floors[currentFloor + 1] !== undefined) {
            currentFloor = currentFloor + 1;
            switchFloor(currentFloor);
            updateFloorLabel();
          }
        });
      function updateFloorLabel() {
        document.getElementById("currentFloorLabel").innerText = `Emelet: ${
          currentFloor === 0 ? "Földszint" : currentFloor + ". Emelet"
        }`;
      }
    }
  }

  // Ellenőrizzük az orientációt:
  function checkOrientation() {
    const overlay = document.getElementById("orientationOverlay");
    if (window.innerWidth < window.innerHeight) {
      overlay.style.display = "flex";
      overlay.style.fontSize = "1.5rem";
    } else {
      overlay.style.display = "none";
    }
  }

  if (isMobileView()) {
    if (window.innerWidth >= window.innerHeight) {
      setupMobile();
    }
    checkOrientation();
  } else {
    setupDesktop();
  }

  window.addEventListener("resize", function () {
    checkOrientation();
  });
});

// Segédfüggvény: adott emelet, sor, oszlop cellájának tartalma
function getCell(floor, row, col) {
  const key = `cell-${row}-${col}`;
  return floors[floor][key] || "";
}

// Vizsgáljuk, hogy egy cella akadályként szerepel-e
function isBlocked(floor, row, col, startName, endName) {
  const cell = getCell(floor, row, col);
  if (cell === "X") return true;
  if (
    cell !== "" &&
    !allowedStairs.includes(cell) &&
    cell !== startName &&
    cell !== endName
  ) {
    return true;
  }
  return false;
}

// Generáljuk a szomszédokat (4 irány az aktuális emeleten, majd lépcső mozgás)
function getNeighbors(node, startName, endName) {
  const { floor, row, col } = node;
  const neighbors = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const rows = Math.ceil(100 / gridSize);
  const cols = gridSize;
  directions.forEach(([dRow, dCol]) => {
    const nRow = row + dRow;
    const nCol = col + dCol;
    if (nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols) {
      if (!isBlocked(floor, nRow, nCol, startName, endName)) {
        neighbors.push({ floor, row: nRow, col: nCol });
      }
    }
  });
  // Ha a jelenlegi cella lépcső, akkor emeletváltás lehetséges
  if (allowedStairs.includes(getCell(floor, row, col))) {
    [floor - 1, floor + 1].forEach((newFloor) => {
      if (
        floors[newFloor] &&
        allowedStairs.includes(getCell(newFloor, row, col))
      ) {
        neighbors.push({ floor: newFloor, row, col });
      }
    });
  }
  return neighbors;
}

// Heurisztika: Manhattan távolság + emeletkülönbség
function heuristic(a, b) {
  return (
    Math.abs(a.row - b.row) +
    Math.abs(a.col - b.col) +
    Math.abs(a.floor - b.floor)
  );
}

// Multi-floor A* algoritmus
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
    if (
      current.floor === endPos.floor &&
      current.row === endPos.row &&
      current.col === endPos.col
    ) {
      return reconstructPath(parent, current);
    }
    const currentKey = nodeKey(current);
    openList.splice(openList.indexOf(current), 1);
    closedSet.add(currentKey);

    const neighbors = getNeighbors(current, startName, endName);
    neighbors.forEach((neighbor) => {
      const neighborKey = nodeKey(neighbor);
      if (closedSet.has(neighborKey)) return;
      const tentativeG = gScore[currentKey] + 1;
      if (tentativeG < (gScore[neighborKey] || Infinity)) {
        parent[neighborKey] = current;
        gScore[neighborKey] = tentativeG;
        fScore[neighborKey] = tentativeG + heuristic(neighbor, endPos);
        if (!openList.some((n) => nodeKey(n) === neighborKey)) {
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

// Útvonalkeresés
function runPathfinding() {
  const startName = document.getElementById("start").value;
  const endName = document.getElementById("end").value;

  const startPos = findNodeByName(startName);
  const endPos = findNodeByName(endName);

  if (!startPos || !endPos) {
    alert("Nem található az indulási vagy célterem! 123");
    return;
  }

  // Futtatjuk a multi-floor A* algoritmust
  currentPath = multiFloorAStar(startPos, endPos, startName, endName);

  // Újrageneráljuk a gridet, így a currentPath alapján a megfelelő cellák ki lesznek emelve
  createGrid(gridSize);

  if (currentPath.length === 0) {
    alert("Nincs útvonal a kiválasztott pontok között!");
  }
}

// Keresés az összes emeletben
function findNodeByName(name) {
  const rows = Math.ceil(100 / gridSize);
  const cols = gridSize;
  for (let fl in floors) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (getCell(parseInt(fl), row, col) === name) {
          return { floor: parseInt(fl), row, col };
        }
      }
    }
  }
  return null;
}
