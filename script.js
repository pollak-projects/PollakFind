const grid = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "X", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "X", ""],
];

const rows = grid.length;
const cols = grid[0].length;

// Utility functions
function isValidCell(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols && grid[x][y] !== "X";
}

function getNeighbors(x, y) {
    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0] // Right, Down, Left, Up
    ];
    const neighbors = [];
    directions.forEach(([dx, dy]) => {
        if (isValidCell(x + dx, y + dy)) {
            neighbors.push([x + dx, y + dy]);
        }
    });
    return neighbors;
}

// A* Algorithm
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
            // Path found
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

    return null; // No path found
}

// Visualization and Input Handling
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

function runPathfinding() {
    const startInput = document.getElementById("start").value.split(",").map(Number);
    const endInput = document.getElementById("end").value.split(",").map(Number);
    const path = findPath(startInput, endInput);
    updateGrid(path);
}

renderGrid();
