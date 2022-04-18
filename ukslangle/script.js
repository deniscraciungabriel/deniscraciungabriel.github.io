let grid = document.getElementById("grid");
let winAlert = document.getElementById("winAlert");
let loseAlert = document.getElementById("loseAlert");
let winWord = document.getElementById("winWord");
let winAttempts = document.getElementById("winAttempts");
let loseWord = document.getElementById("loseWord");
let finish = false;
let header = document.getElementById("header");
let footer = document.getElementById("footer");
let instr = document.getElementById("help-modal");

let lists = [
    ["Arse", "Bare", "Bruv", "Dosh", "Ends", "Gaff", "Knob", "Lush", "Manc", "Mate", "Merk", "Mint", "Naff", "Nick", "Peng", "Pint", "Quid", "Shag", "Slog", "Snog", "Punt", "Ting", "Toff", "Knob"
    ], //4 letters
    ["Bloke", "Barmy", "creps", "dodgy", "Fancy", "Fiver", "Grand", "Strop", "Innit", "Jiffy", "Jokes", "Manor", "Nippy", "Pagan", "Shook", "Skint", "Slash"], //5 letters
    ["Banter", "Bender", "Bonnie", "Buzzin", "Cheers", "Chippy", "Course", "Gaffer", "Galdem", "Mandem", "Minted", "Moolah", "Nicked", "Nutter", "Punter", "Rugger", "Shiner", "Tosser", "Wagwan", "Wanker"], //6 letters
]

let choice = lists[Math.floor(Math.random() * 3)];
let solution = choice[Math.floor(Math.random() * choice.length)];
let attempt = -1;
let win = false;

//create array based on the random choice of the list
let gridArray = [];
for (let i = 0; i < 4; i++) {
    gridArray[i] = new Array(choice[0].length);
}

//create the array visually
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < choice[0].length; j++) {
        grid.innerHTML += `<div class="node empty" id="node-${i}-${j}"></div>`;
    }
}

start();

//set the number of columns based on the list chosen
grid.setAttribute("style", `grid-template-columns:repeat(${choice[0].length}, 1fr)`)

function start() {
    document.addEventListener("keydown", function (e) { type(e.key) });
    let keys = document.querySelectorAll(".key");
    for (let i = 0; i < keys.length; i++) {
        keys[i].addEventListener("click", function (e) { type(e.target.textContent.toLowerCase()) })
    }
}

function type(key) {
    if (!finish) {
        if (key.length == 1 && document.querySelectorAll(".active").length < choice[0].length) {
            let square = document.querySelector(".empty");
            square.textContent = key;
            square.classList.replace("empty", "active");
        }
        else if (key == "Enter") {
            submitLetter();
        }
        else if (key == "Backspace") {
            deleteLetter();
        }
    }
}

function submitLetter() {
    let word = "";
    let square = document.querySelectorAll(".active");
    for (let i = 0; i < square.length; i++) {
        word += square[i].textContent;
    }
    if (word.length == choice[0].length) {
        attempt += 1;
        checkWord(word);
        for (let i = 0; i < square.length; i++) {
            square[i].classList.remove("rotate");
            void square[i].offsetWidth;
            square[i].classList.add("rotate");
        }
        for (let i = 0; i < square.length; i++) {
            square[i].classList.replace("active", "taken");
        }
        if (attempt == 3) {
            console.log("lost");
            stopInteraction();
            showLostAlert();
        }
    }
    else {
        for (let i = 0; i < square.length; i++) {
            square[i].classList.remove("shake");
            void square[i].offsetWidth;
            square[i].classList.add("shake");
        }
    }
}

function deleteLetter() {
    let square = document.querySelectorAll(".active")[document.querySelectorAll(".active").length - 1];
    square.textContent = "";
    square.classList.replace("active", "empty");
}

function checkWord(word) {
    solution = solution.toLowerCase();
    word = word.toLowerCase();
    for (let i = 0; i < word.length; i++) {
        if (solution[i] == word[i]) {
            document.getElementById(`node-${attempt}-${i}`).classList.add("right");
            document.querySelectorAll(`[data-key='${word[i].toUpperCase()}']`)[0].classList.add("right")
        }
        else if (solution.includes(word[i]) && verify(word[i]) == 1) {
            document.getElementById(`node-${attempt}-${i}`).classList.add("included");
            document.querySelectorAll(`[data-key='${word[i].toUpperCase()}']`)[0].classList.add("included");
        }
        else {
            document.getElementById(`node-${attempt}-${i}`).classList.add("not");
            document.querySelectorAll(`[data-key='${word[i].toUpperCase()}']`)[0].classList.add("not")
        }
    }
    if (word == solution) {
        console.log("win");
        showWinAlert();
        win = true;
        stopInteraction();
    }
}

function showWinAlert() {
    winAlert.classList.add("visible");
    winWord.textContent += solution;
    winAttempts.textContent += attempt + 1;
    grid.classList.add("opac");
    header.classList.add("opac");
    footer.classList.add("opac");
}
function showLostAlert() {
    if (!win) {
        loseAlert.classList.add("visible");
        loseWord.textContent += solution;
    }
}

function stopInteraction() {
    console.log("removing event listener...");
    finish = true;
}

function verify(letter) {
    let indexes = getAllIndexes(solution, letter);
    for (let i = 0; i < indexes.length; i++) {
        if (!document.getElementById(`node-${attempt}-${indexes[i]}`).classList.contains("right")) {
            return 1;
        }
    }
    return 0;
}

function getAllIndexes(arr, val) {
    let indexes = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}

function showInstructions() {
    console.log("showing");
    instr.style.display = "flex"
}
function closeInstructions() {
    console.log("showing");
    instr.style.display = "none"
}
