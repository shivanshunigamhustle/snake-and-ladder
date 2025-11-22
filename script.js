const board = document.querySelector('.board');
const startbutton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startGamemodal = document.querySelector(".start-game");
const gameoverModal = document.querySelector(".game-over");
const btnrestart = document.querySelector(".btn-restart")
const highscoreelement=document.querySelector('#high-scores');
const scoreelement=document.querySelector('#scores');
const timeelement=document.querySelector('#time');

const blockheight = 30
const blockwidth = 30
let highScore=localStorage.getItem('highScore')|| 0;
let Score=0;
let time='00-00';
highscoreelement.innerText=highScore

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);


let intervals = null;
let timeintervals=null


let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }

const blocks = [];
let snake = [{
    x: 1, y: 3
}
];

let direction = 'down'



// }
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        //   block.innerText=`${row}-${col}`
        blocks[`${row}-${col}`] = block;


    }
}
function render() {
    let head = null
    blocks[`${food.x}-${food.y}`].classList.add("food")

    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }

    } else if (direction === 'right') {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction === 'down') {
        head = { x: snake[0].x + 1, y: snake[0].y }
    } else if (direction === 'up') {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }
    if (head.x < 0 || head.y < 0 || head.x >= rows || head.y >= cols) {

        clearInterval(intervals);
        modal.style.display = "flex"
        startGamemodal.style.display = 'none'
        gameoverModal.style.display = 'flex'




        return;

    }
    //food consume
    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${food.x}-${food.y}`].classList.add("food")

        snake.push(head);
        Score+=5;
        scoreelement.innerText=Score
        if(Score>highScore){
            highScore=Score
            localStorage.setItem('highScore',highScore.toString())
        }
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");

    })
    snake.unshift(head)
    snake.pop();
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");

    })
}
// intervals=setInterval(()=>{

//     render()
// },300);

startbutton.addEventListener('click', () => {
    modal.style.display = 'none'
    intervals = setInterval(() => {
        render()
    }, 300)
    timeintervals=setInterval(()=>{
        let [min,sec]=time.split("-").map(Number)

        if(sec==59){
            min+=1
            sec=0
        }else{
            sec+=1
        }
        time=`${min}-${sec}`
        timeelement.innerText=time
    },1000)
})
btnrestart.addEventListener('click', restartGame)


function restartGame() {
     blocks[`${food.x}-${food.y}`].classList.remove("food")

     snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");

    })
    Score=0;
    time='00-00'
    
    scoreelement.innerText=Score
    timeelement.innerText=time
    highscoreelement.innerText=highScore
    modal.style.display = 'none'
   
    direction='down'
    snake = [{
        x: 1, y: 3
    }]

    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    intervals = setInterval(() => {
        render()
    }, 300)


}


addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        direction = "up"
    } if (event.key == "ArrowRight") {
        direction = "right"
    } if (event.key == "ArrowDown") {
        direction = "down"
    } if (event.key == "ArrowLeft") {
        direction = "left"
    }

})