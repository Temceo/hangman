const keyboard = document.querySelector("#keyboard");
const word = document.querySelector("#word");
const attemptsEl = document.querySelector("#attempts");
const resetBtn = document.querySelector("#reset");
let attempts;
let selectedWord;
let wordDisplay;

// shuffle words array
const words =
  "ANT BABOON BADGER BAT BEAR BEAVER CAMEL CAT CLAM COBRA COUGAR COYOTE CROW DEER DOG DONKEY DUCK EAGLE FERRET FOX FROG GOAT GOOSE HAWK LION LIZARD LLAMA MOLE MONKEY MOOSE MOUSE MULE NEWT OTTER OWL PANDA PARROT PIGEON PYTHON RABBIT RAM RAT RAVEN RHINO SALMON SEAL SHARK SHEEP SKUNK SLOTH SNAKE SPIDER STORK SWAN TIGER TOAD TROUT TURKEY TURTLE WEASEL WHALE WOLF WOMBAT ZEBRA".split(
    " "
  );

function initialiseGame() {
  if (words) {
    words.sort(() => Math.random() - 0.5);

    // generate alphabet array
    let alphabet = [...Array(26).keys()].map((i) =>
      String.fromCharCode(i + 65)
    );

    selectedWord = words[0];

    // display word as dashes on the screen
    wordDisplay = selectedWord.split("").map(() => "_");

    attempts = 6;
    attemptsEl.textContent = `Attempts left: ${attempts}`;
    word.textContent = wordDisplay.join(" ");

    // fill the keyboard with letters
    alphabet.forEach((letter) => {
      const button = document.createElement("button");
      button.textContent = letter;
      button.classList.add("letter-button");
      button.addEventListener("click", handleLetterClick);
      keyboard.appendChild(button);
    });
  }
}

initialiseGame();

function handleLetterClick(e) {
  const letter = e.target.textContent;
  e.target.disabled = true;
  if (selectedWord.includes(letter)) {
    e.target.classList.add("correct");
  } else {
    attempts--;
    attemptsEl.innerHTML = `Attempts left: <span>${attempts}</span>`;
    e.target.classList.add("incorrect");
  }
  checkWin(letter);
}

function checkWin(letter) {
  const winLose = document.querySelector("#win-lose");
  const wordReveal = document.querySelector("#word-reveal");
  console.log(attempts);
  if (attempts > 0) {
    // show letter on screen
    [...selectedWord].forEach((item, index) => {
      if (letter === item) {
        wordDisplay[index] = item;
      }
    });
  }
  word.textContent = wordDisplay.join(" ");
  if (!wordDisplay.some((letter) => letter === "_")) {
    document.querySelector("#message").style.display = "flex";
    document.querySelector("main").style.display = "none";
    winLose.textContent = "Congratulations, you win!";
    wordReveal.innerHTML = `The word is <span>${selectedWord}</span>`;
    resetGame();
  }
  if (attempts === 0) {
    document.querySelector("#message").style.display = "flex";
    document.querySelector("main").style.display = "none";
    winLose.textContent = "Sorry, you lose!";
    wordReveal.innerHTML = `The word is <span>${selectedWord}</span>`;
    resetGame();
  }
}

function resetGame() {
  resetBtn.addEventListener("click", () => {
    document.querySelector("#message").style.display = "none";
    document.querySelector("main").style.display = "flex";
    keyboard.innerHTML = "";
    initialiseGame();
  });
}
