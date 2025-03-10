document.getElementById("start-game").addEventListener("click", startGame);

let victim = "Alice"; // Default name
let kidnapper = "The Shadow"; // Default name

function startGame() {
    victim = document.getElementById("victim-name").value.trim() || "Alice";
    kidnapper = document.getElementById("kidnapper-name").value.trim() || "The Shadow";

    document.getElementById("intro").classList.add("hidden");
    document.getElementById("story-container").classList.remove("hidden");

    showStory("intro");
}

const story = {
    "intro": {
        text: `One dark night, {victim} was walking home alone when suddenly, a shadowy figure emerged from an alley. It was {kidnapper}. Before {victim} could react, everything went black...`,
        choices: [{ text: "Wake up", next: "cell" }]
    },
    "cell": {
        text: `{victim} wakes up in a dark, damp room. The air is musty, and a single dim lightbulb flickers overhead. A locked door stands in front. A small window is barred shut. There are two options:`,
        choices: [
            { text: "Search the room", next: "search" },
            { text: "Scream for help", next: "scream" }
        ]
    },
    "search": {
        text: `As {victim} searches the room, they find a rusty nail hidden under the bed. It might be useful... Footsteps approach!`,
        choices: [
            { text: "Hide under the bed", next: "hide" },
            { text: "Attack with the nail", next: "attack" }
        ]
    },
    "scream": {
        text: `{victim} screams for help, but the walls are thick. Instead, {kidnapper} hears the noise and enters the room angrily.`,
        choices: [
            { text: "Beg for mercy", next: "beg" },
            { text: "Try to run past them", next: "run" }
        ]
    },
    "hide": {
        text: `{victim} hides under the bed just in time. {kidnapper} enters, looks around, and leaves. A key falls from their pocket!`,
        choices: [
            { text: "Grab the key and unlock the door", next: "corridor" }
        ]
    },
    "attack": {
        text: `{victim} lunges at {kidnapper} with the nail! The attack is weak, but it startles {kidnapper} long enough to push past them!`,
        choices: [
            { text: "Run to the exit!", next: "corridor" }
        ]
    },
    "beg": {
        text: `{kidnapper} laughs. "Pathetic," they say. The last thing {victim} remembers is the cold metal of chains...`,
        choices: [
            { text: "GAME OVER - Restart?", next: "intro" }
        ]
    },
    "run": {
        text: `{victim} dashes past {kidnapper}, but the door is locked! {kidnapper} grabs them and everything fades to black...`,
        choices: [
            { text: "GAME OVER - Restart?", next: "intro" }
        ]
    },

    // The Corridor (New Area)
    "corridor": {
        text: `{victim} finds themselves in a dimly lit corridor. The walls are cracked, and the air smells of mildew. They see three paths ahead.`,
        choices: [
            { text: "Go left (toward a noise)", next: "noise_room" },
            { text: "Go right (dark passage)", next: "dark_passage" },
            { text: "Move straight (toward a faint light)", next: "light_room" }
        ]
    },

    // Left Path: The Noise Room
    "noise_room": {
        text: `{victim} enters a room where eerie whispers fill the air. There's a wooden chest in the center.`,
        choices: [
            { text: "Open the chest", next: "trap" },
            { text: "Ignore the chest and leave", next: "corridor" }
        ]
    },
    "trap": {
        text: `The chest was booby-trapped! A dart shoots out, hitting {victim}. Darkness follows...`,
        choices: [
            { text: "GAME OVER - Restart?", next: "intro" }
        ]
    },

    // Right Path: The Dark Passage
    "dark_passage": {
        text: `{victim} walks through the passage, feeling their way along the walls. Suddenly, something moves in the shadows!`,
        choices: [
            { text: "Run back!", next: "corridor" },
            { text: "Keep going", next: "creature" }
        ]
    },
    "creature": {
        text: `{victim} hears breathing. A tall, shadowy creature emerges. It watches but does not attack.`,
        choices: [
            { text: "Try to communicate", next: "friend" },
            { text: "Attack!", next: "monster_attack" }
        ]
    },
    "friend": {
        text: `The creature tilts its head and extends a bony finger toward a hidden door. A way out?`,
        choices: [
            { text: "Go through the door", next: "outside" }
        ]
    },
    "monster_attack": {
        text: `{victim} swings wildly, but the creature is too fast. A sharp claw slashes forward...`,
        choices: [
            { text: "GAME OVER - Restart?", next: "intro" }
        ]
    },

    // Middle Path: The Light Room
    "light_room": {
        text: `{victim} steps into a room where a candle flickers. On the table, there’s a **strange key** and a **map**.`,
        choices: [
            { text: "Take the key", next: "corridor" },
            { text: "Take the map", next: "hidden_exit" }
        ]
    },
    "hidden_exit": {
        text: `{victim} follows the map, revealing a secret passage behind an old bookshelf.`,
        choices: [
            { text: "Enter the passage", next: "outside" }
        ]
    },

    // Final Escape
    "outside": {
        text: `{victim} pushes through a broken door, feeling fresh air for the first time. The nightmare is over... or is it?`,
        choices: [
            { text: "CONGRATULATIONS! Play Again?", next: "intro" }
        ]
    }
};


function showStory(scene) {
    let sceneData = story[scene];

    // Replace placeholders with actual names
    let updatedText = sceneData.text.replace(/{victim}/g, victim).replace(/{kidnapper}/g, kidnapper);
    
    document.getElementById("story-text").innerText = updatedText;

    let choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    sceneData.choices.forEach(choice => {
        let btn = document.createElement("button");
        btn.innerText = choice.text;
        btn.addEventListener("click", () => showStory(choice.next));
        choicesDiv.appendChild(btn);
    });
}
