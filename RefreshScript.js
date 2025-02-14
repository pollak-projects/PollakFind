// Ezek a nyilacska emoji-k jelölik a lépcsőket
const allowedStairs = ["⬇️", "➡️", "⬆️", "⬅️"];
const presetRoomNames = ["Info I", "Játék"]; // Itt add meg a kivételként kezelt szobaneveket!

// Frissített getNeighbors függvény, amely figyelembe veszi az emeletváltozás szabályait
const stairConnections = {
  // Földszint és 1. emelet közötti lépcsőkapcsolatok
  "0-12-2": { floor: 1, row: 4, col: 2 },
  "0-11-19": { floor: 1, row: 3, col: 19 },
  "1-4-2": { floor: 0, row: 12, col: 2 },
  "1-3-19": { floor: 0, row: 11, col: 19 },

  // 1. és 2. emelet közötti lépcsőkapcsolatok
  "1-4-2": { floor: 2, row: 4, col: 2 },
  "1-3-19": { floor: 2, row: 3, col: 19 },
  "2-4-2": { floor: 1, row: 4, col: 2 },
  "2-3-19": { floor: 1, row: 3, col: 19 },
};

// Emeletek: minden emelet saját sor- és oszlopszámmal, illetve cellaadatokkal
const floors = {
  0: {
    rows: 13, // például: 10 sor
    cols: 20, // például: 20 oszlop

    "cell-0-0": "X",
    "cell-0-1": "X",
    "cell-0-2": "Ajtó",
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
    "cell-1-1": "",
    "cell-1-2": "",
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
    "cell-1-17": "X",
    "cell-1-18": "X",
    "cell-1-19": "X",

    "cell-2-0": "X",
    "cell-2-1": "X",
    "cell-2-2": "",
    "cell-2-3": "",
    "cell-2-4": "",
    "cell-2-5": "",
    "cell-2-6": "",
    "cell-2-7": "",
    "cell-2-8": "",
    "cell-2-9": "",
    "cell-2-10": "",
    "cell-2-11": "",
    "cell-2-12": "",
    "cell-2-13": "",
    "cell-2-14": "",
    "cell-2-15": "",
    "cell-2-16": "",
    "cell-2-17": "",
    "cell-2-18": "",
    "cell-2-19": "",

    "cell-3-0": "",
    "cell-3-1": "",
    "cell-3-2": "",
    "cell-3-3": "X",
    "cell-3-4": "FérfiÖ",
    "cell-3-5": "X",
    "cell-3-6": "X",
    "cell-3-7": "FérfiM",
    "cell-3-8": "X",
    "cell-3-9": "X",
    "cell-3-10": "NőiÖ",
    "cell-3-11": "X",
    "cell-3-12": "X",
    "cell-3-13": "X",
    "cell-3-14": "Szert.",
    "cell-3-15": "X",
    "cell-3-16": "X",
    "cell-3-17": "Torna T.",
    "cell-3-18": "X",
    "cell-3-19": "X",

    "cell-4-0": "",
    "cell-4-1": "X",
    "cell-4-2": "",
    "cell-4-3": "X",
    "cell-4-4": "X",
    "cell-4-5": "X",
    "cell-4-6": "X",
    "cell-4-7": "X",
    "cell-4-8": "X",
    "cell-4-9": "X",
    "cell-4-10": "X",
    "cell-4-11": "X",
    "cell-4-12": "X",
    "cell-4-13": "X",
    "cell-4-14": "X",
    "cell-4-15": "X",
    "cell-4-16": "X",
    "cell-4-17": "X",
    "cell-4-18": "X",
    "cell-4-19": "X",

    "cell-5-0": "X",
    "cell-5-1": "X",
    "cell-5-2": "",
    "cell-5-3": "X",
    "cell-5-4": "X",
    "cell-5-5": "X",
    "cell-5-6": "X",
    "cell-5-7": "X",
    "cell-5-8": "X",
    "cell-5-9": "X",
    "cell-5-10": "X",
    "cell-5-11": "X",
    "cell-5-12": "X",
    "cell-5-13": "X",
    "cell-5-14": "X",
    "cell-5-15": "X",
    "cell-5-16": "X",
    "cell-5-17": "X",
    "cell-5-18": "X",
    "cell-5-19": "X",

    "cell-6-0": "KAjtó",
    "cell-6-1": "",
    "cell-6-2": "",
    "cell-6-3": "Ajtó",
    "cell-6-4": "X",
    "cell-6-5": "X",
    "cell-6-6": "X",
    "cell-6-7": "X",
    "cell-6-8": "X",
    "cell-6-9": "X",
    "cell-6-10": "X",
    "cell-6-11": "X",
    "cell-6-12": "X",
    "cell-6-13": "X",
    "cell-6-14": "X",
    "cell-6-15": "X",
    "cell-6-16": "X",
    "cell-6-17": "X",
    "cell-6-18": "X",
    "cell-6-19": "X",

    "cell-7-0": "X",
    "cell-7-1": "X",
    "cell-7-2": "",
    "cell-7-3": "X",
    "cell-7-4": "X",
    "cell-7-5": "X",
    "cell-7-6": "X",
    "cell-7-7": "X",
    "cell-7-8": "X",
    "cell-7-9": "X",
    "cell-7-10": "X",
    "cell-7-11": "X",
    "cell-7-12": "X",
    "cell-7-13": "X",
    "cell-7-14": "X",
    "cell-7-15": "X",
    "cell-7-16": "X",
    "cell-7-17": "X",
    "cell-7-18": "X",
    "cell-7-19": "X",

    "cell-8-0": "X",
    "cell-8-1": "Chill",
    "cell-8-2": "",
    "cell-8-3": "X",
    "cell-8-4": "X",
    "cell-8-5": "X",
    "cell-8-6": "X",
    "cell-8-7": "X",
    "cell-8-8": "X",
    "cell-8-9": "X",
    "cell-8-10": "X",
    "cell-8-11": "X",
    "cell-8-12": "X",
    "cell-8-13": "X",
    "cell-8-14": "X",
    "cell-8-15": "X",
    "cell-8-16": "X",
    "cell-8-17": "SzerT",
    "cell-8-18": "NőiM",
    "cell-8-19": "X",

    "cell-9-0": "X",
    "cell-9-1": "Büfé",
    "cell-9-2": "",
    "cell-9-3": "",
    "cell-9-4": "",
    "cell-9-5": "",
    "cell-9-6": "X",
    "cell-9-7": "X",
    "cell-9-8": "X",
    "cell-9-9": "X",
    "cell-9-10": "X",
    "cell-9-11": "X",
    "cell-9-12": "X",
    "cell-9-13": "X",
    "cell-9-14": "X",
    "cell-9-15": "X",
    "cell-9-16": "I. Tant.",
    "cell-9-17": "",
    "cell-9-18": "",
    "cell-9-19": "HBej",

    "cell-10-0": "X",
    "cell-10-1": "X",
    "cell-10-2": "",
    "cell-10-3": "",
    "cell-10-4": "X",
    "cell-10-5": "",
    "cell-10-6": "X",
    "cell-10-7": "X",
    "cell-10-8": "X",
    "cell-10-9": "X",
    "cell-10-10": "X",
    "cell-10-11": "X",
    "cell-10-12": "X",
    "cell-10-13": "X",
    "cell-10-14": "X",
    "cell-10-15": "X",
    "cell-10-16": "X",
    "cell-10-17": "",
    "cell-10-18": "",
    "cell-10-19": "X",

    "cell-11-0": "Játék",
    "cell-11-1": "",
    "cell-11-2": "",
    "cell-11-3": "",
    "cell-11-4": "",
    "cell-11-5": "",
    "cell-11-6": "",
    "cell-11-7": "",
    "cell-11-8": "",
    "cell-11-9": "",
    "cell-11-10": "",
    "cell-11-11": "",
    "cell-11-12": "",
    "cell-11-13": "",
    "cell-11-14": "",
    "cell-11-15": "",
    "cell-11-16": "",
    "cell-11-17": "",
    "cell-11-18": "",
    "cell-11-19": "➡️",

    "cell-12-0": "",
    "cell-12-1": "X",
    "cell-12-2": "⬇️",
    "cell-12-3": "FőBej",
    "cell-12-4": "X",
    "cell-12-5": "X",
    "cell-12-6": "X",
    "cell-12-7": "Mat2",
    "cell-12-8": "X",
    "cell-12-9": "Mat3",
    "cell-12-10": "X",
    "cell-12-11": "X",
    "cell-12-12": "X",
    "cell-12-13": "X",
    "cell-12-14": "CadC",
    "cell-12-15": "X",
    "cell-12-16": "X",
    "cell-12-17": "X",
    "cell-12-18": "Info VI",
    "cell-12-19": "X",
  },
  1: {
    rows: 5,
    cols: 20,
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

  2: {
    rows: 5,
    cols: 20,
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
    "cell-1-17": "X",
    "cell-1-18": "X",
    "cell-1-19": "X",

    "cell-2-0": "X",
    "cell-2-1": "X",
    "cell-2-2": "X",
    "cell-2-3": "X",
    "cell-2-4": "X",
    "cell-2-5": "X",
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
    "cell-2-18": "X",
    "cell-2-19": "X",

    "cell-3-0": "X",
    "cell-3-1": "Játék",
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

    "cell-4-0": "",
    "cell-4-1": "Fwc2",
    "cell-4-2": "⬇️",
    "cell-4-3": "X",
    "cell-4-4": "X",
    "cell-4-5": "Mat1",
    "cell-4-6": "X",
    "cell-4-7": "VII. Tant.",
    "cell-4-8": "X",
    "cell-4-9": "X",
    "cell-4-10": "VIII. Tant.",
    "cell-4-11": "X",
    "cell-4-12": "X",
    "cell-4-13": "X",
    "cell-4-14": "IX. Tant.",
    "cell-4-15": "X",
    "cell-4-16": "X",
    "cell-4-17": "X",
    "cell-4-18": "X. Tant.",
    "cell-4-19": "X",
  },
};

let currentFloor = 0;
let grid = [];

// Eltároljuk a jelenlegi útvonalat, hogy minden emelet váltásnál meg tudjuk jeleníteni a megfelelő részt
let currentPath = [];

// Grid létrehozása az aktuális emelet beállításai szerint
let timeoutIds = [];

function createGrid() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = ""; // Előző grid törlése
  grid = [];
  const floorData = floors[currentFloor];
  const rows = floorData.rows;
  const cols = floorData.cols;

  // Töröljük az összes korábbi időzítőt
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];

  for (let row = 0; row < rows; row++) {
    let rowArray = [];
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      const cellId = `cell-${row}-${col}`;
      cell.id = cellId;
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      cell.style.userSelect = "none";

      const key = `cell-${row}-${col}`;
      if (floorData[key]) {
        const name = floorData[key];
        if (name === "X") {
          cell.classList.add("black");
          cell.innerText = "";
        } else {
          cell.innerText = name;
        }
      }

      // Ha az aktuális útvonalban van, késleltetve emeljük ki
      const pathIndex = currentPath.findIndex(
        (n) => n.floor === currentFloor && n.row === row && n.col === col
      );
      if (pathIndex !== -1) {
        const timeoutId = setTimeout(() => {
          cell.classList.add("path");
        }, pathIndex * 75); // 75ms lépésenkénti késleltetés
        timeoutIds.push(timeoutId);
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
    createGrid();
  }
}

const roomIndex = {};

function buildRoomIndex() {
  for (let fl in floors) {
    const floorData = floors[fl];
    for (let row = 0; row < floorData.rows; row++) {
      for (let col = 0; col < floorData.cols; col++) {
        const cellValue = getCell(parseInt(fl), row, col);
        if (cellValue && cellValue !== "X") {
          roomIndex[cellValue] = { floor: parseInt(fl), row, col };
        }
      }
    }
  }
}

// Az indexet egyszer felépítjük, amikor az oldal betöltődik
document.addEventListener("DOMContentLoaded", function () {
  buildRoomIndex();
  createGrid();
  centerGrid(true);
  window.addEventListener("resize", () => centerGrid());
});

setupDesktop();

window.addEventListener("resize", centerGrid);

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
      const minLeft = 300;
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
    gridMovedManually = false; // Reset esetén újra középre igazítjuk
    centerGrid(true);
    currentPath = [];
    createGrid();
  };
}

let gridMovedManually = false; // Jelzi, hogy a felhasználó mozgatta-e a gridet

function centerGrid(force = false) {
  const gridElement = document.getElementById("grid");
  const leftPanel = document.querySelector(".left-panel");

  if (!gridElement || !leftPanel) return;

  // Ha a felhasználó már mozgatta a gridet, ne igazítsuk középre (kivéve, ha force = true)
  if (gridMovedManually && !force) return;

  const gridWidth = gridElement.offsetWidth;
  const gridHeight = gridElement.offsetHeight;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const leftPanelWidth = leftPanel.offsetWidth; // Fix távolság a left-panel és a grid között

  // Középre számított pozíció
  const centerX = (windowWidth - gridWidth) / 2;
  const adjustedX = Math.max(leftPanelWidth + panelMargin, centerX);

  gridElement.style.position = "absolute";
  gridElement.style.left = `${adjustedX}px`;
  gridElement.style.top = `${(windowHeight - gridHeight) / 2}px`;
}

// Figyeljük a felhasználói mozgatást, hogy ne ugráljon vissza
document.addEventListener("mousedown", (event) => {
  const gridElement = document.getElementById("grid");
  if (gridElement.contains(event.target)) {
    gridMovedManually = true;
  }
});

// Segédfüggvény: adott emelet, sor, oszlop cellájának tartalma
function getCell(floor, row, col) {
  const key = `cell-${row}-${col}`;
  return floors[floor][key] || "";
}

// Vizsgáljuk, hogy egy cella akadályként szerepel-e
function isBlocked(floor, row, col, startName, endName) {
  const cell = getCell(floor, row, col);
  if (cell === "X") return true; // Falak továbbra is akadályok

  // Ha a cella neve szerepel a presetRoomNames listában, akkor engedélyezzük az áthaladást
  if (presetRoomNames.includes(cell)) {
    return false;
  }

  // Alapból minden más akadály (ha nem indulási vagy célállomás)
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

function getNeighbors(node, startName, endName) {
  const { floor, row, col } = node;
  const neighbors = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const floorData = floors[floor];
  const maxRows = floorData.rows;
  const maxCols = floorData.cols;
  const startPos = findNodeByName(startName);
  const endPos = findNodeByName(endName);

  if (!startPos || !endPos) {
    console.error("Hiba: Érvénytelen kezdő- vagy célpont.");
    return [];
  }

  const sameFloor = startPos.floor === endPos.floor;

  directions.forEach(([dRow, dCol]) => {
    const nRow = row + dRow;
    const nCol = col + dCol;
    if (nRow >= 0 && nRow < maxRows && nCol >= 0 && nCol < maxCols) {
      const cellValue = getCell(floor, nRow, nCol);

      // Ha ugyanazon az emeleten van, akkor tiltsuk a lépcsőket
      if (sameFloor && allowedStairs.includes(cellValue)) {
        return;
      }

      if (!isBlocked(floor, nRow, nCol, startName, endName)) {
        neighbors.push({ floor, row: nRow, col: nCol });
      }
    }
  });

  // Ha emeletváltás szükséges, biztosítsuk, hogy a lépcsőkapcsolatok mindig működjenek
  const currentKey = `${node.floor}-${node.row}-${node.col}`;
  if (stairConnections[currentKey]) {
    const target = stairConnections[currentKey];
    neighbors.push({
      floor: target.floor,
      row: target.row,
      col: target.col,
    });
  }

  // Ellenőrizzük, hogy a célpont másik emeleten van-e, és ha igen, biztosítsuk az átjárást
  if (!sameFloor) {
    Object.entries(stairConnections).forEach(([key, target]) => {
      if (target.floor === floor && target.row === row && target.col === col) {
        neighbors.push({
          floor: parseInt(key.split("-")[0]),
          row: parseInt(key.split("-")[1]),
          col: parseInt(key.split("-")[2]),
        });
      }
    });
  }

  return neighbors;
}

// Heurisztika: Manhattan távolság + emeletkülönbség
function heuristic(a, b) {
  // Ha lépcsőn vagyunk, ne számoljuk a pozíciók közötti távolságot
  if (stairConnections[`${a.floor}-${a.row}-${a.col}`]) {
    return Math.abs(a.floor - b.floor); // Prioritizáljuk az emeletváltást
  }
  return (
    Math.abs(a.row - b.row) +
    Math.abs(a.col - b.col) +
    Math.abs(a.floor - b.floor) * 10 // Emeljen nagyobb súllyal az emeletkülönbségre
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
    path.push({ floor: current.floor, row: current.row, col: current.col });
    current = parent[nodeKey(current)];
  }
  return path.reverse();
}

// Útvonalkeresés
function runPathfinding() {
  const startName = document.getElementById("start").value;
  const endName = document.getElementById("end").value;

  // Ellenőrizzük, hogy van-e kiválasztva kezdő- és célpont
  if (!startName || !endName) {
    alert("Válassz egy kezdő és/vagy célpontot!");
    return; // Kilépünk a függvényből, ha nincs mindkettő kiválasztva
  }

  console.log("Startname:", startName, "End:", endName);

  const startPos = findNodeByName(startName);
  const endPos = findNodeByName(endName);
  console.log("Startpos:", startPos, "End:", endPos);

  if (!startPos || !endPos) {
    alert("Érvénytelen kezdő- vagy célpont.");
    return;
  }

  // Futtatjuk a multi-floor A* algoritmust
  currentPath = multiFloorAStar(startPos, endPos, startName, endName);
  console.log(currentPath);

  // Újrageneráljuk a gridet, így a currentPath alapján a megfelelő cellák ki lesznek emelve
  createGrid();

  if (currentPath.length === 0) {
    alert("Nincs útvonal a kiválasztott pontok között!");
  }
}

// Keresés az összes emeletben
function findNodeByName(name) {
  return roomIndex[name] || null;
}


function switchFloor(floor) {
  if (floors[floor]) {
    currentFloor = floor;
    gridMovedManually = false; // Reset manual dragging flag
    createGrid();
    centerGrid(true); // Re-center the grid
  }
}
