document.getElementById("start-game").addEventListener("click", startGame);

let victim, kidnapper;

function startGame() {
    victim = document.getElementById("victim-name").value || "Alice";
    kidnapper = document.getElementById("kidnapper-name").value || "The Shadow";

    document.getElementById("intro").classList.add("hidden");
    document.getElementById("story-container").classList.remove("hidden");

    showStory("intro");
}

const story = {
    "intro": {
        text: `One dark night, ${victim} was walking home alone when suddenly, a shadowy figure emerged from an alley. It was ${kidnapper}. Before ${victim} could react, everything went black...`,
        choices: [
            { text: "Wake up", next: "cell" }
        ]
    },
    "cell": {
        text: `${victim} wakes up in a dark, damp room. The air is musty, and a single dim lightbulb flickers overhead. A locked door stands in front. There are two options:`,
        choices: [
            { text: "Search the room", next: "search" },
            { text: "Scream for help", next: "scream" }
        ]
    },
    "search": {
        text: `As ${victim} searches the room, they find a rusty nail hidden under the bed. It might be useful... Footsteps approach!`,
        choices: [
            { text: "Hide under the bed", next: "hide" },
            { text: "Attack with the nail", next: "attack" }
        ]
    },
    "scream": {
        text: `${victim} screams for help, but the walls are thick. Instead, ${kidnapper} hears the noise and enters the room angrily.`,
        choices: [
            { text: "Beg for mercy", next: "beg" },
            { text: "Try to run past them", next: "run" }
        ]
    },
    "hide": {
        text: `${victim} hides under the bed just in time. ${kidnapper} enters, looks around, and leaves. A key falls from their pocket!`,
        choices: [
            { text: "Grab the key and unlock the door", next: "escape" }
        ]
    },
    "attack": {
        text: `${victim} lunges at ${kidnapper} with the nail! The attack is weak, but it startles ${kidnapper} long enough to push past them!`,
        choices: [
            { text: "Run to the exit!", next: "escape" }
        ]
    },
    "beg": {
        text: `${kidnapper} laughs. "Pathetic," they say. The last thing ${victim} remembers is the cold metal of chains...`,
        choices: [
            { text: "GAME OVER - Restart?", next: "intro" }
        ]
    },
    "run": {
        text: `${victim} dashes past ${kidnapper}, but the door is locked! ${kidnapper} grabs them and everything fades to black...`,
        choices: [
            { text: "GAME OVER - Restart?", next: "intro" }
        ]
    },
    "escape": {
        text: `${victim} bursts through the door, running into the night. The fresh air fills their lungs. ${victim} has ESCAPED!`,
        choices: [
            { text: "Play Again?", next: "intro" }
        ]
    }
};

function showStory(scene) {
    let sceneData = story[scene];
    document.getElementById("story-text").innerText = sceneData.text;

    let choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    sceneData.choices.forEach(choice => {
        let btn = document.createElement("button");
        btn.innerText = choice.text;
        btn.addEventListener("click", () => showStory(choice.next));
        choicesDiv.appendChild(btn);
    });
}
