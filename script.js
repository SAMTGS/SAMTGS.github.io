const DIRECTIONS = {
    "N": "north", "S": "south", "E": "east", "W": "west",
    "NE": "north-east", "NW": "north-west", "SE": "south-east", "SW": "south-west"
};

const ROOMS = {
    "Living Room": { "N": "Bedroom", "E": "Kitchen", "NE": "Toilet", "SE": "Balcony" },
    "Kitchen": { "N": "Utility", "W": "Living Room" },
    "Utility": { "S": "Kitchen" },
    "Toilet": { "SW": "Living Room" },
    "Bedroom": { "SE": "Living Room" },
    "Balcony": { "W": "Living Room" }
};

let player = { name: "Alice", room: "", axis: "" };
let kidnapper = { name: "Bob", room: "", axis: "" };
let isVictim = true; 

function initializeGame() {
    let playerRooms = Object.keys(ROOMS);
    player.room = playerRooms[Math.floor(Math.random() * playerRooms.length)];
    kidnapper.room = playerRooms[Math.floor(Math.random() * playerRooms.length)];
    
    let directionKeys = Object.keys(DIRECTIONS);
    player.axis = directionKeys[Math.floor(Math.random() * directionKeys.length)];
    kidnapper.axis = directionKeys[Math.floor(Math.random() * directionKeys.length)];
    
    document.getElementById("story").innerText = 
        `${player.name} is trapped in a mysterious flat and must escape before ${kidnapper.name} catches them!`;
    
    updateStatus();
}

function updateStatus() {
    let statusText = `${player.name} is in ${DIRECTIONS[player.axis]} of ${player.room}.
    ${kidnapper.name} is in ${DIRECTIONS[kidnapper.axis]} of ${kidnapper.room}.`;

    document.getElementById("game-status").innerText = statusText;
}

function move(direction) {
    if (!DIRECTIONS[direction]) {
        alert("Invalid direction!");
        return;
    }

    if (ROOMS[player.room][direction]) {
        player.room = ROOMS[player.room][direction];
        player.axis = "";
    } else if (player.room === "Living Room" && direction === "SE") {
        document.getElementById("game-status").innerHTML = `🎉 YOU WIN! ${player.name} escaped from ${kidnapper.name}! 🎉`;
        disableButtons();
        return;
    } else {
        player.axis = direction;
    }

    moveKidnapper();
}

function moveKidnapper() {
    let randomDirection = Object.keys(DIRECTIONS)[Math.floor(Math.random() * Object.keys(DIRECTIONS).length)];
    
    if (ROOMS[kidnapper.room][randomDirection]) {
        kidnapper.room = ROOMS[kidnapper.room][randomDirection];
        kidnapper.axis = "";
    } else {
        kidnapper.axis = randomDirection;
    }

    checkGameOver();
    updateStatus();
}

function checkGameOver() {
    if (player.room === kidnapper.room && player.axis === kidnapper.axis) {
        document.getElementById("game-status").innerHTML = `❌ YOU LOSE! ${player.name} was captured by ${kidnapper.name}! ❌`;
        disableButtons();
    }
}

function disableButtons() {
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

// Start the game
initializeGame();
