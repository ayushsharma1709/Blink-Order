let gameSeq = [];
let userSeq = [];

let src = document.querySelector(".highScr");
src.innerHTML = `High Score : <b>0</b>`;
let highestScr = 0;

let btns = ["yellow" , "red" , "purple" , "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress" , () => {
   
    if (started == false) {
        console.log("game Started");
        started = true

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = []; 

    level++;

    if(highestScr < level) {
        highestScr = level;
        src.innerHTML = `High Score : <b>${highestScr}</b>`;
    }

    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * 4);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`); 

    gameSeq.push(randColor);
    console.log(gameSeq);

    btnFlash(randBtn);
}

function currLevel (indx) {

    if(userSeq[indx] === gameSeq[indx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp , 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "wheat";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userColor);
    currLevel(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click" , btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}