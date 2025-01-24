

const gameboard = document.querySelector(".gameboard");


window.addEventListener("keydown",control_snake);

let context = gameboard.getContext('2d');
let unit = 25;
let height = 500;
let width = 500;

let foodX;
let foodY;

let xmove = unit;
let ymove = 0;
let active = true ;
let score = 0 ;

let snake = [
           {x:unit*3,y:0},
           {x:unit*2,y:0},
           {x:unit,y:0},
           {x:0,y:0}
           ];

 start_game();

function start_game(){
  context.fillStyle = "gray";
  context.fillRect(0,0,width,height);
  create_food();
  display_food();
  draw_snake();

}

function clear_board(){
  context.fillStyle = "gray";
  context.fillRect(0,0,width,height);
}


function draw_snake(){
  
  context.fillStyle = "green";
  context.fillStroke="#2f2f2f";
  snake.forEach((snakepoints)=>{
    context.fillRect(snakepoints.x,snakepoints.y,unit,unit);
    context.strokeRect(snakepoints.x,snakepoints.y,unit,unit);
  })
  
}
function create_food(){
  foodX = Math.floor(Math.random()*width/unit)*unit;
  foodY = Math.floor(Math.random()*width/unit)*unit;
  
}
function display_food(){
  context.fillStyle ="red";
  context.fillRect(foodX,foodY,unit,unit)
}

function move_snake(){
  let head = {x:snake[0].x+xmove, y:snake[0].y+ymove};
  snake.unshift(head);
  
  
  if(snake[0].x==foodX && snake[0].y==foodY){
    create_food()
    score++;
    document.getElementById("score").innerHTML = score;
  }
  else{
    snake.pop()
  }
}


function nextic(){

  if(active){
    setTimeout(()=>{
      clear_board();
      display_food(); 
      move_snake();
      draw_snake();
      game_over();
      nextic();
    },200)
  }

  
  }
  

function game_over(){
  
  switch(true){
      case(snake[0].x<0):
      case(snake[0].y<0):
      case(snake[0].x>=width):
      case(snake[0].y>=height):
      clear_board();
      context.font = "bold 20px serif";
      context.fillStyle = "red";
      context.textAlign = "center";
      context.fillText("game over press F5 to restart the game",250,250)
      break;
      
  }
}


function control_snake(event){

  if(event.keyCode==32){
      if(active==false){
          active = true;
          nextic();
      }
      else{
          active = false
      }
  }


  if(event.keyCode == 40  && ymove!=-unit){
      xmove = 0;
      ymove = unit;
  }
  else if(event.keyCode == 39 && xmove!=-unit ){
      xmove = unit;
      ymove = 0;
  }
  else if(event.keyCode == 38 && ymove!=unit ){
      xmove = 0;
      ymove = -unit;
  } 
  else if(event.keyCode == 37 && xmove!=unit ){
      xmove = -unit;
      ymove = 0;
  }
}