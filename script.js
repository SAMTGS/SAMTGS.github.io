document.getElementById("start-game").addEventListener("click", startGame);

let victim = "Alice";
let kidnapper = "The Shadow";

function startGame() {
  victim = document.getElementById("victim-name").value.trim() || "Alice";
  kidnapper = document.getElementById("kidnapper-name").value.trim() || "The Shadow";

  document.getElementById("intro").classList.add("hidden");
  document.getElementById("story-container").classList.remove("hidden");

  showStory("intro");
}

const story = {
  "intro": {
    text: "On a cold, foggy night, {victim} was walking home when a pair of glinting eyes appeared in the darkness. Before {victim} knew it, {kidnapper} emerged and everything went black...",
    choices: [
      { text: "Wake up", next: "cell" }
    ]
  },
  "cell": {
    text: "{victim} regains consciousness in a damp, dimly lit cell with stone walls. The only sounds are dripping water and distant echoes. On the floor, {victim} spots a small metal object and a locked door stands before you.",
    choices: [
      { text: "Search the cell", next: "search" },
      { text: "Call out for help", next: "scream" },
      { text: "Stay silent and observe", next: "observe" }
    ]
  },
  "search": {
    text: "While searching the cell, {victim} finds a rusty nail and a crumpled note hidden behind a loose stone. The note hints at a secret passage. Suddenly, you hear footsteps approaching outside the cell.",
    choices: [
      { text: "Hide behind debris", next: "hide" },
      { text: "Try to pick the lock with the nail", next: "pick_lock" },
      { text: "Prepare to confront the intruder", next: "confront" }
    ]
  },
  "scream": {
    text: "{victim} screams loudly, hoping for rescue. Instead, the noise brings {kidnapper} charging into the cell in fury.",
    choices: [
      { text: "Fight {kidnapper}", next: "fight" },
      { text: "Beg for mercy", next: "beg" }
    ]
  },
  "observe": {
    text: "Deciding to remain silent, {victim} listens intently. Faint voices and creaking wood suggest a hidden passage nearby.",
    choices: [
      { text: "Examine the walls", next: "inspect_walls" },
      { text: "Wait until the intruder leaves", next: "wait" }
    ]
  },
  "hide": {
    text: "Quickly, {victim} hides behind a pile of old crates. The footsteps stop at the cell door. After a tense moment, the sounds fade. In the silence, the note’s message becomes clearer.",
    choices: [
      { text: "Read the note", next: "read_note" },
      { text: "Attempt to pick the lock now", next: "pick_lock" }
    ]
  },
  "pick_lock": {
    text: "Using the rusty nail, {victim} fumbles with the lock. After several nerve-wracking moments, a click is heard and the cell door creaks open, revealing a narrow, dark corridor.",
    choices: [
      { text: "Step into the corridor", next: "corridor" },
      { text: "Go back and hide", next: "hide" }
    ]
  },
  "confront": {
    text: "Mustering courage, {victim} stands ready as the door bursts open. {kidnapper} appears, eyes burning with malice. With a cold smile, {kidnapper} taunts, 'You have a story to tell...'",
    choices: [
      { text: "Demand answers", next: "demand" },
      { text: "Attack with the nail", next: "attack" }
    ]
  },
  "fight": {
    text: "In a desperate bid for survival, {victim} lunges at {kidnapper} with the nail. The struggle is brutal but short-lived as {kidnapper} easily overpowers you.",
    choices: [
      { text: "GAME OVER - Restart?", next: "intro" }
    ]
  },
  "beg": {
    text: "Falling to your knees, {victim} pleads for mercy. {kidnapper} scoffs at your weakness and leaves you to your fate in the dark cell.",
    choices: [
      { text: "GAME OVER - Restart?", next: "intro" }
    ]
  },
  "inspect_walls": {
    text: "On close inspection, {victim} finds a loose brick in the wall. Behind it lies a small key and a detailed map of the building—revealing a secret tunnel leading out.",
    choices: [
      { text: "Take the key and study the map", next: "tunnel" },
      { text: "Ignore the map and try the lock", next: "pick_lock" }
    ]
  },
  "wait": {
    text: "Time drags on as {victim} waits in silence. Eventually, the footsteps fade. With a deep breath, you decide to make a move.",
    choices: [
      { text: "Search the cell for any clues", next: "search" },
      { text: "Recall details about {kidnapper}", next: "reminisce" }
    ]
  },
  "read_note": {
    text: "The note reads: 'Where darkness meets the light, your freedom lies hidden.' Confused but intrigued, {victim} ponders its meaning.",
    choices: [
      { text: "Look for a source of light in the cell", next: "light" },
      { text: "Proceed into the corridor", next: "corridor" }
    ]
  },
  "corridor": {
    text: "In the corridor, {victim} faces two diverging paths: one veiled in total darkness and the other illuminated by a faint, eerie glow.",
    choices: [
      { text: "Take the dark left path", next: "left_path" },
      { text: "Take the glowing right path", next: "right_path" }
    ]
  },
  "left_path": {
    text: "The left path is pitch black. {victim} stumbles blindly while unsettling whispers surround you. Suddenly, a pair of glowing eyes appears—it's a trap!",
    choices: [
      { text: "Scramble to escape", next: "trap_escape" },
      { text: "Stand your ground", next: "game_over" }
    ]
  },
  "right_path": {
    text: "The right path leads to a chamber bathed in a pulsating glow. Here, relics of past captives and a locked door adorned with mysterious symbols beckon.",
    choices: [
      { text: "Examine the symbols", next: "symbols" },
      { text: "Try the key on the door", next: "unlock_door" }
    ]
  },
  "demand": {
    text: "{victim} demands, 'Why have you brought me here, {kidnapper}?' With a sinister grin, {kidnapper} replies, 'To unearth the secrets buried in your past.' Shocked and confused, you must decide your next move.",
    choices: [
      { text: "Ask for more details", next: "reveal_truth" },
      { text: "Attack in confusion", next: "attack" }
    ]
  },
  "attack": {
    text: "Driven by fear and anger, {victim} attacks {kidnapper} with the nail. The ensuing struggle leaves {kidnapper} staggered and creates a window for escape.",
    choices: [
      { text: "Dash for freedom", next: "escape" },
      { text: "Continue fighting", next: "fight" }
    ]
  },
  "reveal_truth": {
    text: "{kidnapper} coldly reveals that {victim}'s family has hidden dark secrets—and this kidnapping was meant to force a confession. Torn between betrayal and survival, {victim} must choose a path.",
    choices: [
      { text: "Confess to your past", next: "confess" },
      { text: "Refuse and fight back", next: "fight_back" }
    ]
  },
  "confess": {
    text: "Overwhelmed by guilt, {victim} confesses, hoping mercy might follow. {kidnapper} listens and then offers a small envelope—a last chance for redemption.",
    choices: [
      { text: "Open the envelope", next: "envelope" },
      { text: "Reject it and run", next: "escape" }
    ]
  },
  "fight_back": {
    text: "With newfound resolve, {victim} fights back fiercely. Though {kidnapper} is formidable, your will to survive shines through.",
    choices: [
      { text: "Overpower {kidnapper}", next: "overpower" },
      { text: "Escape while distracted", next: "escape" }
    ]
  },
  "envelope": {
    text: "Inside the envelope, {victim} finds documents exposing a corrupt organization. The truth is dangerous—should it be revealed or kept secret?",
    choices: [
      { text: "Expose the organization", next: "expose" },
      { text: "Keep the secret and flee", next: "escape" }
    ]
  },
  "overpower": {
    text: "In a dramatic struggle, {victim} subdues {kidnapper} and discovers a key to the cell. With {kidnapper} restrained, freedom beckons.",
    choices: [
      { text: "Step into the corridor", next: "corridor" }
    ]
  },
  "unlock_door": {
    text: "Using the key found earlier, {victim} unlocks the door. Beyond lies a stairway descending into deeper darkness—a path filled with uncertainty.",
    choices: [
      { text: "Descend the stairs", next: "stairway" },
      { text: "Return to the chamber", next: "right_path" }
    ]
  },
  "stairway": {
    text: "The creaking stairway chills your bones as you descend. Shadows twist around you until a heavy door stands at the bottom.",
    choices: [
      { text: "Open the door", next: "final_room" },
      { text: "Hesitate and reconsider", next: "game_over" }
    ]
  },
  "final_room": {
    text: "Beyond the door, {victim} enters a grand hall filled with relics and echoes of lost souls. At its center, a mysterious figure awaits—perhaps the one who holds the key to ending this nightmare.",
    choices: [
      { text: "Approach the figure", next: "confront_final" },
      { text: "Search the hall for clues", next: "search_hall" }
    ]
  },
  "confront_final": {
    text: "The figure reveals themselves as a wise mentor who explains that your kidnapping was orchestrated to force you to confront the sins of your past. Now, {victim} must choose: seek redemption or succumb to darkness.",
    choices: [
      { text: "Seek redemption", next: "redemption" },
      { text: "Embrace the darkness", next: "dark_ending" }
    ]
  },
  "search_hall": {
    text: "While scavenging the hall, {victim} gathers evidence of a vast conspiracy. Each clue forces a painful choice—expose the truth at great personal risk or escape into anonymity.",
    choices: [
      { text: "Expose the conspiracy", next: "expose" },
      { text: "Discard the evidence and escape", next: "escape" }
    ]
  },
  "redemption": {
    text: "Choosing redemption, {victim} vows to bring the corrupt organization to justice. Allies are gathered, and the fight for truth begins—a new chapter of hope emerges.",
    choices: [
      { text: "THE END - Restart?", next: "intro" }
    ]
  },
  "dark_ending": {
    text: "In a tragic twist, {victim} embraces the darkness within. The truth remains hidden, and you vanish into the shadows—a life forever lost in secrets and regret.",
    choices: [
      { text: "THE END - Restart?", next: "intro" }
    ]
  },
  "expose": {
    text: "With courage and evidence in hand, {victim} exposes the dark conspiracy. Though the revelation shakes the foundations of power, the cost is high, and you are forever changed.",
    choices: [
      { text: "THE END - Restart?", next: "intro" }
    ]
  },
  "game_over": {
    text: "Tragically, {victim} fails to escape the clutches of darkness. The nightmare persists, and there is no turning back.",
    choices: [
      { text: "GAME OVER - Restart?", next: "intro" }
    ]
  },
  "reminisce": {
    text: "{victim} recalls happier times before the nightmare—a bittersweet memory that offers momentary solace, but also the weight of loss. The memories fuel a final decision.",
    choices: [
      { text: "Use the strength of memory to search again", next: "search" },
      { text: "Let the past overwhelm you", next: "game_over" }
    ]
  },
  "light": {
    text: "Investigating the faint light in the cell, {victim} discovers a small window letting in a beam of moonlight. It reveals hidden carvings on the wall—clues to escape.",
    choices: [
      { text: "Study the carvings", next: "inspect_walls" },
      { text: "Ignore them and head to the corridor", next: "corridor" }
    ]
  },
  "trap_escape": {
    text: "In a frantic scramble, {victim} dodges the trap and barely escapes the clutches of unseen assailants lurking in the dark.",
    choices: [
      { text: "Run to the corridor", next: "corridor" }
    ]
  }
};

function showStory(scene) {
  const sceneData = story[scene];
  // Replace placeholders with entered names
  const updatedText = sceneData.text.replace(/{victim}/g, victim).replace(/{kidnapper}/g, kidnapper);
  document.getElementById("story-text").innerText = updatedText;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  sceneData.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.addEventListener("click", () => showStory(choice.next));
    choicesDiv.appendChild(btn);
  });
}
