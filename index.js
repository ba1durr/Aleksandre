const typingDiv = document.getElementById("typing");
const statsDiv = document.getElementById("stats");
const startGameBtn = document.getElementById("start-game");

const pharagraphs = [
  `"The quick brown fox jumps over the lazy dog" is an English-language pangram.`,
  `- Envy of other people shows how they are unhappy. Their continual attention to others behavior shows how they are boring. - Seneca`,
];

const startGame = () => {
  startGameBtn.classList.add("hidden");
  typingDiv.innerHTML = "";
  statsDiv.innerHTML = "";

  const text = pharagraphs[parseInt(Math.random() * pharagraphs.length)];

  const characters = text.split("").map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    typingDiv.appendChild(span);
    return span;
  });

  let cursorIndex = 0;
  let cursorCharacter = characters[cursorIndex];
  cursorCharacter.classList.add("cursor");

  let startTime = null;

  const keydown = ({ key }) => {
    if (!startTime) {
      startTime = new Date();
    }

    if (key === cursorCharacter.innerText) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.add("done");
      cursorCharacter = characters[++cursorIndex];
    }

    if (cursorIndex >= characters.length) {
      // game ended
      const endTime = new Date();
      const delta = endTime - startTime;
      const seconds = delta / 1000;
      const numberOfWords = text.split(" ").length;
      const wps = numberOfWords / seconds;
      const wpm = wps * 60.0;
      document.getElementById("stats").innerText = `wpm = ${parseInt(wpm)}`;
      document.removeEventListener("keydown", keydown);
      startGameBtn.classList.remove("hidden");
      return;
    }

    cursorCharacter.classList.add("cursor");
  };

  document.addEventListener("keydown", keydown);
};