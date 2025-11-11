const board=document.querySelector('.board');
const blockheight=30
const blockwidth=30

const cols=Math.floor(board.clientWidth / blockwidth);
const rows=Math.floor(board.clientHeight / blockheight);
const blocks=[];
const snake=[{
    x: 1, y: 3
},{
    x: 1 , y :4
},{
    x :1 , y: 5
}];
let direction='left'


    
// }
for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
        const block=document.createElement('div');
        block.classList.add("block");
          board.appendChild(block);
          block.innerText=`${row}-${col}`
          blocks [`${row}-${col}`]=block;
    

    }
}
function render(){
    snake.forEach(segment=>{
      blocks[`${segment.x}-${segment.y}`].classList.add("fill");
      
    })
}
setInterval(()=>{
    let head=null
    if(direction==="left"){
        head={x:snake[0].x,y:snake[0].y-1}
    }
    snake.forEach(segment=>{
      blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
      
    })
    snake.unshift(head)
    snake.pop();
    render()
},400);