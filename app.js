let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let maxScore = 0;

let btns = ["orange", "pink", "green", "purple"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let x = Math.floor(Math.random() * 3);
  let randomColor = btns[x];
  gameSeq.push(randomColor);
  let randombtn = document.querySelector(`.${randomColor}`);
  gameFlash(randombtn);
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor); 
  checkAns(userSeq.length - 1);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) setTimeout(levelUp(), 1000);
  } else {
    if (level > maxScore) {
      maxScore = level;
      let h3 = document.querySelector("h3");
      h3.innerHTML = `Max Score:${maxScore}`;
      let h1 = document.querySelector("h1");
      h1.innerHTML = "Congratulations!!It's a new high score";
      setTimeout(function () {
        h1.innerHTML = "Simon Game";
      }, 2000);
    }
    h2.innerText = `Game over !! Your score was ${level} Press any key to start the game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
