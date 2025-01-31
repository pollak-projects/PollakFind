// Ezt lehetőleg ne bántsuk mert elcseszi a pathfindingot!
const gridSize = 20;
// Cella nevek
const cellNames = {
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
    "cell-4-19": "X",
};

document.addEventListener("DOMContentLoaded", function() {
const gridElement = document.getElementById("grid");
let isDragging = false;
let offsetX, offsetY;

gridElement.addEventListener("mousedown", function(event) {
    isDragging = true;
    offsetX = event.clientX - gridElement.offsetLeft;
    offsetY = event.clientY - gridElement.offsetTop;
    gridElement.style.cursor = "grabbing";
});

document.addEventListener("mousemove", function(event) {
    if (isDragging) {
        gridElement.style.left = `${event.clientX - offsetX}px`;
        gridElement.style.top = `${event.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", function() {
    isDragging = false;
    gridElement.style.cursor = "grab";
});

// Reset button to bring the grid back to the original position
window.resetGridPosition = function() {
    gridElement.style.left = "300px";
    gridElement.style.top = "20px";
};
});

let grid = [];

document.addEventListener("DOMContentLoaded", function() {
    createGrid(gridSize);
});

function createGrid(columns) {
    const gridElement = document.getElementById("grid");
    gridElement.innerHTML = ''; // Clear any existing grid

    grid = [];
    // Itt megtudjuk változtatni a sorok számát, több = kevesebb. De pls ne bántsuk még!!
    const rows = Math.ceil(100 / columns); // Dynamic number of rows based on column count

    for (let row = 0; row < rows; row++) {
        let rowArray = [];
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement("div");
            const cellId = `cell-${row}-${col}`;
            cell.id = cellId;
            cell.setAttribute("data-row", row);
            cell.setAttribute("data-col", col);

            // Check if the cell has a predefined name
            if (cellNames[cellId]) {
                const name = cellNames[cellId];
                if (name === "X") {
                    cell.classList.add("black");
                    cell.innerText = ""; // Empty text when black
                } else {
                    cell.innerText = name;
                }
            }

            rowArray.push(cell);
            gridElement.appendChild(cell);
        }
        grid.push(rowArray);
    }
}

function runPathfinding() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    const startPos = findCellPositionByName(start);
    const endPos = findCellPositionByName(end);

    const startCell = grid[startPos.row][startPos.col];
    const endCell = grid[endPos.row][endPos.col];

    document.querySelectorAll(".grid div").forEach(cell => cell.classList.remove("start", "end", "path"));

    if (startCell) startCell.classList.add("start");
    if (endCell) endCell.classList.add("end");

    // A* pathfinding logic
    const path = aStar(startPos, endPos);

    if (path.length > 0) {
        path.forEach(cell => cell.classList.add("path"));
    } else {
        alert("No path found!");
    }
}

function findCellPositionByName(name) {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col].innerText === name) {
                return { row, col };
            }
        }
    }
    return null; // No cell with that name
}

// A* algorithm implementation
function aStar(startPos, endPos) {
    const openList = [];
    const closedList = [];
    const gScore = [];
    const fScore = [];
    const parent = [];
    const directions = [
        [-1, 0], // up
        [1, 0], // down
        [0, -1], // left
        [0, 1] // right
    ];

    // Initialize all scores to infinity
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            gScore[`${row},${col}`] = Infinity;
            fScore[`${row},${col}`] = Infinity;
        }
    }

    gScore[`${startPos.row},${startPos.col}`] = 0;
    fScore[`${startPos.row},${startPos.col}`] = heuristic(startPos, endPos);

    openList.push(startPos);

    while (openList.length > 0) {
        // Get the cell with the lowest fScore
        let current = openList.reduce((lowest, node) => 
            fScore[`${node.row},${node.col}`] < fScore[`${lowest.row},${lowest.col}`] ? node : lowest
        );

        if (current.row === endPos.row && current.col === endPos.col) {
            return reconstructPath(parent, current);
        }

        openList.splice(openList.indexOf(current), 1);
        closedList.push(current);

        for (let dir of directions) {
            let newRow = current.row + dir[0];
            let newCol = current.col + dir[1];

            if (isValidMove(newRow, newCol) 
            && !closedList.some(c => c.row === newRow 
            && c.col === newCol) 
            && !isBlackCell(newRow, newCol)
            && !notDestinationRoom(newRow, newCol)
            )  {
                const tentativeG = gScore[`${current.row},${current.col}`] + 1;

                if (tentativeG < gScore[`${newRow},${newCol}`]) {
                    parent[`${newRow},${newCol}`] = current;
                    gScore[`${newRow},${newCol}`] = tentativeG;
                    fScore[`${newRow},${newCol}`] = gScore[`${newRow},${newCol}`] + heuristic({ row: newRow, col: newCol }, endPos);
                    if (!openList.some(c => c.row === newRow && c.col === newCol)) {
                        openList.push({ row: newRow, col: newCol });
                    }
                }
            }
        }
    }

    return []; // No path found
}

function isValidMove(row, col) {
    return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

function notDestinationRoom(row, col){
    return !grid[row][col].classList.contains("end")
    && !grid[row][col].classList.contains("start")
    && grid[row][col].innerHTML !== "";
}

function isBlackCell(row, col) {
    return grid[row][col].classList.contains("black");
}

function heuristic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function reconstructPath(parent, current) {
    let path = [];
    while (current) {
        path.push(grid[current.row][current.col]);
        current = parent[`${current.row},${current.col}`];
    }
    return path.reverse();
}