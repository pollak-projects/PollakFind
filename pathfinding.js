// A grid definiálása, ahol az akadályok és szobák vannak
const grid = [
    ["aula", "", "", "", "X"], // a cellák nevei, pl. "aula"
    ["", "X", "X", "", ""],
    ["", "", "", "mat3", ""],  // mat3 is egy szoba név
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Szobák koordinátái (pl. aula, mat3, stb.)
  const rooms = {
    aula: [0, 1],  // aula koordinátái a gridben
    mat3: [2, 3],  // mat3 koordinátái a gridben
    tori: [3, 2],  // mat3 koordinátái a gridben
  };
  
  // Függvény a szoba nevének koordinátává konvertálásához
  function getRoomCoordinates(roomName) {
    return rooms[roomName.toLowerCase()];
  }
  
  // Ellenőrzi, hogy a cella érvényes-e (nem lépünk ki a gridből és nem akadály)
  function isValidCell(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols && grid[x][y] !== "X"; // Ha nem akadály
  }
  
  // Ellenőrzi, hogy a kezdő és célhelyek validak-e (nem akadályok)
  function isStartOrEndValid(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols && grid[x][y] !== "X"; // Ha nem akadály
  }
  
  // A szomszédos cellák lekérése (4 irányban)
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
  
  // A* algoritmus az útvonal kereséshez
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
  
  // Megjeleníti a gridet és az utat a gridben
  function renderGrid() {
    const gridElement = document.getElementById("grid");
    gridElement.innerHTML = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
  
        // Ha van szoba név a cellában, jelenítse meg
        if (grid[r][c] !== "X" && grid[r][c] !== "") {
          cell.textContent = grid[r][c];  // Szoba neve
        }
  
        // Ha akadály (X), akkor a cella háttérszíne fekete
        if (grid[r][c] === "X") {
          cell.classList.add("obstacle");
        }
  
        gridElement.appendChild(cell);
      }
    }
  }
  
  // A pathvizualizálás, az utat jelző cellák színét változtatja
  function updateGrid(path) {
    renderGrid();
    if (path) {
      path.forEach(([x, y]) => {
        const cell = document.getElementById("grid").children[x * cols + y];
        cell.classList.add("path");
      });
    }
  }
  
  // A funkció, amely futtatja az útvonal keresést
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
    updateGrid(path); // Megjeleníti az útvonalat
  }
  
  // Inicializálás és a grid megjelenítése
  renderGrid();
  