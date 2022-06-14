/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  //The phrase constructor
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  //Display the phrase onto the page visually
  addPhraseToDisplay() {
    let phraseSection = document.querySelector("div#phrase ul");
    for (let i = 0; i < this.phrase.length; i++) {
      if (this.phrase[i] === " ") {
        phraseSection.innerHTML += `<li class="space"> </li>`;
      } else {
        phraseSection.innerHTML += `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
      }
    }
  }

  //Check if the letter clicked appears in the phrase
  checkLetter(letter) {
    const matches = document.querySelectorAll(`li.${letter}`);
    if (matches.length > 0) {
      for (let j = 0; j < matches.length; j++) {
        if (matches[j] === letter) {
          this.showMatchedLetter(letter);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  //Display the matched letter in the phrase
  showMatchedLetter(letter) {
    let letters = document.querySelectorAll(`li.${letter}`);
    for (let k = 0; k < letters.length; k++) {
      letters[k].classList.remove("hide");
      letters[k].classList.add("show");
    }
  }
}