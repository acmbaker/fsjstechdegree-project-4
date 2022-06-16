/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let startButton = document.querySelector("button#btn__reset");
const game = new Game();

//Event listener for once the start button has been clicked.
startButton.addEventListener("click", (e) => {
  game.startGame();
});

//Event listener for clicks on keyboard
let keyboard = document.querySelector("div#qwerty");
keyboard.addEventListener("click", (e) => {
  if (e.target.textContent.length === 1) {
    game.handleInteraction(e);
  }
});

//Event listener for physical computer keyboard
document.addEventListener("keydown", (e) => {
  let regex = /^\w{1}$/;

  //Regex test then passing the key pressed to the handleInteraction.
  if (regex.test(e.key)) {
    let keys = document.querySelectorAll("button.key");
    for (let i = 0; i < keys.length; i++) {
      if (e.key === keys[i].textContent && keys[i].disabled === false && document.querySelector("div#overlay").style.display === "none") {
        game.handleInteraction(keys[i]);
      }
    }
  }
});
