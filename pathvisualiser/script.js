let container = document.getElementById("container");

const ROWS = 25;
const COL = 35;
let start = null;
let end = null;
let isMouseDown = false;
const SPEED = 25; //ms
let SearchInterval;
let visited = [];
let unvisited = [];

function Node(r, c) {
    this.role = "Empty";
    this.distance = Infinity;
    this.prev = null;
    this.row = r;
    this.col = c;
}

//make 2D array
let grid = new Array(COL);
for (let i = 0; i < ROWS; i++) {
    grid[i] = new Array(ROWS);
}

//fill array with nodes
for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COL; j++) {
        grid[i][j] = new Node(i, j);
    }
}

//check if mouse button is down
function ChangeStateTrue(event) {
    isMouseDown = true;
}
function ChangeStateFalse(event) {
    isMouseDown = false;
}


function ChangeRole(r, c, event) {
    node = grid[r][c];
    nodeEl = document.getElementById(`node-${r}-${c}`);

    if (event.button == 0) {
        if (node.role != "Start" && start == null) {
            node.role = "Start";
            nodeEl.classList.remove("Empty");
            nodeEl.classList.add("Start");
            start = grid[r][c];
        }
        else if (node.role != "End" && node.role != "Start" && end == null) {
            node.role = "End";
            nodeEl.classList.remove("Empty");
            nodeEl.classList.add("End");
            end = grid[r][c];
        }
    }
    else if (event.button == 1) {
        if (node.role == "Start") {
            node.role = "Empty";
            nodeEl.classList.remove("Start");
            nodeEl.classList.add("Empty");
            start = null;
        }
        else if (node.role == "End") {
            node.role = "Empty";
            nodeEl.classList.remove("End");
            nodeEl.classList.add("Empty");
            end = null;
        }
    }

}

function BuildWall(r, c, event) {
    node = grid[r][c];
    nodeEl = document.getElementById(`node-${r}-${c}`);

    if (isMouseDown) {
        if (node.role != "End" && node.role != "Start" && event.button == 0) {
            node.role = "Wall"
            nodeEl.classList.remove("Empty");
            nodeEl.classList.add("Wall");
        }
        else if (node.role == "Wall" && event.button == 1) {
            node.role = "Empty"
            nodeEl.classList.remove("Wall");
            nodeEl.classList.add("Empty");
        }
    }
}


//fill HTML with nodes
for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COL; j++) {
        let child = `
            <div class="node ${grid[i][j].role}" id="node-${i}-${j}"onclick="ChangeRole(${i}, ${j}, event)", onmouseover="BuildWall(${i}, ${j}, event)"></div>
            `;
        container.innerHTML += child;
    }
}


//algorithm implementation
//fill unvisited array
for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COL; j++) {
        unvisited.push(grid[i][j]);
    }
}

//sort unvisited
function compare_distance(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}
function visit(node, cur) {
    node2 = grid[node.row][node.col];
    nodeEL = document.getElementById(`node-${node.row}-${node.col}`);
    node.prev = cur;
    node.distance = cur.distance + 1;
    if (node.role != "End") {
        nodeEL.classList.remove("Empty");
        nodeEL.classList.add("Visited");
    }
    if (node == end) {
        Path(node);
        console.log("TROVATO");
    }
}

function Search() {
    console.log("Searching...");
    cur = unvisited[0];
    unvisited.shift();
    visited.push(cur);
    console.log(cur);
    nb = [];
    up = unvisited.find(element => element == grid[cur.row - 1][cur.col]);
    down = unvisited.find(element => element == grid[cur.row + 1][cur.col]);
    left = unvisited.find(element => element == grid[cur.row][cur.col - 1]);
    right = unvisited.find(element => element == grid[cur.row][cur.col + 1]);
    //for every neighbour, if not visited, update distance from start
    if (unvisited.includes(up) && up.role != "Wall") {
        console.log("Visiting up");
        visit(up, cur);
    }
    if (unvisited.includes(down) && down.role != "Wall") {
        console.log("Visiting Down");
        visit(down, cur);
    }
    if (unvisited.includes(left) && left.role != "Wall") {
        console.log("Visiting Left");
        visit(left, cur);
    }
    if (unvisited.includes(right) && right.role != "Wall") {
        console.log("Visiting Right");
        visit(right, cur);
    }
    unvisited.sort(compare_distance);
    console.log(unvisited);
}


function Path(node) {
    clearInterval(SearchInterval);
    let path = [];
    while (node.role != "Start") {
        path.push(node.prev);
        node = node.prev;
    }
    //change color to path so you can visualise it
    for (let i = 0; i < path.length - 1; i++) {
        console.log(`node-${path[i].row}-${path[i].col}`);
        console.log(path[i]);
        nodeEL = document.getElementById(`node-${path[i].row}-${path[i].col}`);
        nodeEL.classList.remove("Visited");
        nodeEL.classList.add("Path");
    }
    console.log(path);
}


function Start() {
    if (start != null) {
        start.distance = 0;
        unvisited.sort(compare_distance);
        SearchInterval = setInterval(function () { Search() }, SPEED);
    }
}

function Stop() {
    SearchInterval = clearInterval(SearchInterval);
}


