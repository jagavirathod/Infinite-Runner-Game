
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car, car_driving, car_crashed;
var road, invisibleGround, roadImage;

var truckGroup, truck, truckImage
var oil_canGroup, oil_can, oil_canImage

var score;
var gameOverImg, restartImg
var driveSound , dieSound

function preload(){
car_driving= loadAnimation("Car.jpg");
car_crashed= loadAnimation("Car crashed.jpg")

roadImage= loadImage("Road image.jpg");
oil_can= loadImage("oil_can.1.jpg");
truck= loadImage("truck.1.jpg");

restartImg= loadImage("restart.webp");
gameOverImg= loadImage("game_over.jpg");
driveSound= loadSound("highway-traffic-cars-and-street-sounds-8029.mp3");
dieSound= loadSound("car-accident-with-squeal-and-crash-6054.mp3");
}

function setup(){
  createCanvas(600,600);
  car= createSprite(50,160,20,50);
  car.addAnimation("driving", car_driving);
  car.addAnimation("crashed", car_crashed);
  car.scale= 0.5;

  road = createSprite(200,180,400,20);
  road.addImage("road",roadImage);
  road.x = road.width/2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create truck and oil_can, coins Groups
  oil_canGroup = createGroup();
  truckGroup = createGroup();
  coinsGroup = createGroup();

  car.setCollider("rectangle",0,0,car.width,car.height);
  //car.debug = true
  
  score = 0;
  
}

function draw() {

    background(roadImage);
    //displaying score
    text("Score: "+ score, 500,50);

    if(gameState === PLAY){

        gameOver.visible = false;
        restart.visible = false;
        
        road.velocityX = -(4 + 3* score/100)
        //scoring
        score = score + Math.round(getFrameRate()/100);
        
        if (road.x < 0){
          road.x = road.width/2;
        }
        //move when the left or right key is pressed
    if(keyDown("left")&& car.y >= 100) {
        car.velocityX = -12;
        driveSound.play();
    }
    if(keyDown("right")&& car.y >= 100) {
        car.velocityX = 12;
        driveSound.play();
    }
    //spawn the trucks
    spawntruck();
  
    //spawn oil_can on the ground
    spawnoil_can();

    if(truckGroup.isTouching(car)){
        //car.velocityX = -12;
        driveSound.play();
        gameState = END;
        dieSound.play()
    }
  }
    else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //change the car animation
    car.changeAnimation("crashed", car_crashed);

    road.velocityX = 0;
    car.velocityY = 0

    //set lifetime of the game objects so that they are never destroyed
    truckGroup.setLifetimeEach(-1);
    oil_canGroup.setLifetimeEach(-1);
    truckGroup.setVelocityXEach(0);
    oil_canGroup.setVelocityXEach(0); 
    
    if(mousePressedOver(restart)) {
        reset();
      }
    drawSprites();
  }

  function reset(){
    gameState= PLAY
  truckGroup,destroyEach()
  oil_canGroup.destroyEach()
  car.changeAnimation("crashed", car_crashed);
  score=0
  }
}
  
 function spawntruck(){
  if (frameCount % 50 === 0){
  var truck = createSprite(600,180,50,20)
    truck.addImage(truckImage)
    truck.velocityX = -(6 + score/100);
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: truck.addImage(truckImage);
              break;
      case 2: oil_can.addImage(oil_canImage);
              break;
      default: break;
  }
  truck.scale = 0.5;
  truck.lifetime = 300;
  truck.depth = car.depth;
  car.depth = car.depth+1;
  truckGroup.add(truck);
 }
 }    
     
 function spawnoil_can(){
  if (frameCount % 100 === 0) {
  var oil_can = createSprite(400,450,50,20)
  oil_can.x = Math.round(random(80,120));
  oil_can.addImage(oil_canImage);
  oil_can.scale = 0.5;
  oil_can.velocityX = -3;
  oil_can.lifetime= 200;
  oil_can.depth = car.depth;
  car.depth = car.depth+1;
  oil_canGroup.add(oil_can);
  }
 }


  





