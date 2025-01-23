const grid = [
    ["", "", "", "", "X"],
    ["", "X", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
];

const rows = grid.length;
const cols = grid[0].length;

function isValidCell(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols; // Remove the grid[x][y] !== "X" condition
}


function isStartOrEndValid(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols && grid[x][y] === "X";
}

function getNeighbors(x, y) {
    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
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
                fScore[nx][ny] = gScore[nx][ny] + Math.abs(nx - ex) + Math.abs(ny - ey);
                if (!openSet.some(([ox, oy]) => ox === nx && oy === ny)) {
                    openSet.push([nx, ny]);
                }
            }
        });
    }

    return null;
}

function visualizePath(path) {
    if (!path) {
        console.log("No path found!");
        return;
    }

    const gridCopy = grid.map(row => [...row]);
    path.forEach(([x, y]) => {
        if (gridCopy[x][y] !== "X") {
            gridCopy[x][y] = "P";
        }
    });

    console.log("Path:");
    console.log(gridCopy.map(row => row.join(" ")).join("\n"));
}

function runPathfinding() {
    const startInput = document.getElementById("start").value.split(",").map(Number);
    const endInput = document.getElementById("end").value.split(",").map(Number);

    if (!isStartOrEndValid(startInput[0], startInput[1])) {
        alert("Invalid start position! Must be an 'X'.");
        return;
    }
    if (!isStartOrEndValid(endInput[0], endInput[1])) {
        alert("Invalid end position! Must be an 'X'.");
        return;
    }

    const path = findPath(startInput, endInput);
    if (!path) {
        alert("No path found!");
        return;
    }
    updateGrid(path); // Call updateGrid to visualize the path
}


const gridElement = document.getElementById("grid");

function renderGrid() {
    gridElement.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (grid[r][c] === "X") {
                cell.classList.add("obstacle");
            }
            gridElement.appendChild(cell);
        }
    }
}

function updateGrid(path) {
    renderGrid();
    if (path) {
        path.forEach(([x, y]) => {
            const cell = gridElement.children[x * cols + y];
            cell.classList.add("path");
        });
    }
}

renderGrid();
