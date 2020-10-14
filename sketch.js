var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obs1,obs2,obs3,obs4,obs5,obs6;

var newImage;

var gameState

var score

var gameOver,restart

function Reset(){
gameState="play"  
gameOver.visible=false
Restart.visible=false
obstaclesGroup.destroyEach();
cloudsgroup.destroyEach();
trex.changeAnimation("running",trex_running)
score=0
}

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  gameover=loadImage("gameOver.png")
  restart=loadImage("restart.png")
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  obs1=loadImage("obstacle1.png")
  obs2=loadImage("obstacle2.png")
  obs3=loadImage("obstacle3.png")
  obs4=loadImage("obstacle4.png")
  obs5=loadImage("obstacle5.png")
  obs6=loadImage("obstacle6.png")
}

function setup() {
  createCanvas(600, 200);
  score=0
  gameState= "play"
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  cloudsgroup=new Group()
  obstaclesGroup=new Group()

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //console.log("Hello"+ 5)
  
  trex.setCollider("circle",0,0,40);
  //trex.debug=true
  
 gameOver=createSprite(300,100)
 Restart=createSprite(300,150)

 gameOver.addImage(gameover)
 gameOver.scale = 0.7
  Restart.addImage(restart)
  Restart.scale = 0.5
}

function draw() {
  background(180);
  
  text("score:  "+score,500,50)
 
    if(gameState==="play"){
      ground.velocityX = -4;
      score=score+Math.round(getFrameRate()/60)
      if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -10;
    }

    if(trex.isTouching(obstaclesGroup)){
       gameState="end"
    }
    spawnClouds();
    spawnobstacles();


    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    } 
   gameOver.visible=false;
    Restart.visible=false;
    } 

  else if (gameState==="end"){
    ground.velocityX=0;
  
    trex.changeAnimation("collided",trex_collided);
    
    cloudsgroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    
    trex.velocityY=0
    
    cloudsgroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    gameOver.visible=true;
    Restart.visible=true;
  
   if(mousePressedOver(Restart)){
     Reset()
  }
   
  }
    
  
    trex.collide(invisibleGround);
  
  
    
    //spawn the clouds
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0){ 
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
     
    //assigning lifetime to the variable
    cloud.lifetime = 134
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsgroup.add(cloud)
}
}
function spawnobstacles(){
if(frameCount%60===0){
  obstacles=createSprite(600,165,20,10)
  obstacles.velocityX=-8
  var r=Math.round(random(1,6))
  switch(r){
  case 1:obstacles.addImage(obs1); 
  break; 
  case 2:obstacles.addImage(obs2);
  break
  case 3:obstacles.addImage(obs3);
  break
  case 4:obstacles.addImage(obs4);
  break
  case 5:obstacles.addImage(obs5);
  break
  case 6:obstacles.addImage(obs6);
  break
  default:break;
  }
  obstacles.scale=0.4
  obstacles.lifetime=150
 obstaclesGroup.add(obstacles)
}
}  

