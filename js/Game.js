/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  //Game constructor
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase("Bo Jo"),
      new Phrase("Quick Run"),
      new Phrase("Jo Smoke"),
      new Phrase("Zombie Survive"),
      new Phrase("Alien Ant"),
    ];
    this.activePhrase = null;
  }

  //startGame method, runs start game button click
  startGame() {
    document.querySelector("div#overlay").style.display = "none";
    let newPhrase = this.getRandomPhrase();
    this.activePhrase = newPhrase;
    this.activePhrase.addPhraseToDisplay();
  }

  //Generates random phrase from the this.phrases constructor
  getRandomPhrase() {
    const random = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[random];
  }

  //Handles all interaction with the game
  handleInteraction(e) {
    if (e.target !== undefined) {
      e.target.disabled = true;

      if (this.activePhrase.checkLetter(e.target.textContent)) {
        e.target.classList.add("chosen");
        this.activePhrase.showMatchedLetter(e.target.textContent);
      }
      if (!this.activePhrase.checkLetter(e.target.textContent)) {
        e.target.classList.add("wrong");
        this.removeLife();
      }
    } else {
      e.disabled = true;

      if (this.activePhrase.checkLetter(e.textContent)) {
        e.classList.add("chosen");
        this.activePhrase.showMatchedLetter(e.textContent);
      } else if (!this.activePhrase.checkLetter(e.textContent)) {
        e.classList.add("wrong");
        this.removeLife();
      }
    }
    this.checkForWin();
  }

  //If someone has selected an incorrect character, this method runs.
  removeLife() {
    this.missed += 1;
    const heartSelector = document.querySelector(
      'img[src="images/liveHeart.png"]'
    );
    heartSelector.src = "images/lostHeart.png";
  }

  //Check to see if they have completed the phrase
  checkForWin() {
    if (this.missed === 5) {
      this.gameOver("fail");
    } else if (
      document.querySelectorAll("li.hide").length === 0 &&
      this.missed < 5
    ) {
      this.gameOver("win");
    }
  }

  //The method for once the game has finished
  gameOver(result) {
    let resultMessage = document.querySelector("h1#game-over-message");

    //If statements depending on results
    if (result === "win") {
      document.querySelector("div#overlay").style.display = "";
      document.querySelector("div#overlay").classList.remove("lose");
      document.querySelector("div#overlay").classList.add("win");
      resultMessage.textContent = "You won! Click Start Game to play again.";
    } else if (result === "fail") {
      document.querySelector("div#overlay").style.display = "";
      document.querySelector("div#overlay").classList.remove("win");
      document.querySelector("div#overlay").classList.add("lose");
      resultMessage.innerHTML = `You lost! Click Start Game to play again.`;
    }

    //Existing phrase reset
    const existingPhrase = document.querySelectorAll("div#phrase ul li");
    for (let a = 0; a < existingPhrase.length; a++) {
      existingPhrase[a].remove();
    }

    //Heart and counter reset
    const heartSelector = document.querySelectorAll(
      'img[src="images/lostHeart.png"]'
    );
    this.missed = 0;
    for (let b = 0; b < heartSelector.length; b++) {
      heartSelector[b].src = "images/liveHeart.png";
    }

    //Key reset
    let keys = document.querySelectorAll("button.key");
    for (let c = 0; c < keys.length; c++) {
      keys[c].classList.remove = "chosen";
      keys[c].classList.remove = "wrong";
      keys[c].disabled = false;
    }
  }
}
