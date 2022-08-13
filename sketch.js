var torre, TorreImg;
var puerta, puertaImg, DoorGroup;
var barandal, barandalImg, barandalGroup;
var fantasma, fantasmaImg;
var barandalfalso,FalsoGroup;
var gameState = "play";
var sound;
var score;

function preload (){
  TorreImg = loadImage ("tower.png");
  puertaImg = loadImage ("door.png");
  barandalImg = loadImage ("climber.png");
  fantasmaImg = loadImage ("ghost-standing.png");
  sound = loadSound ("spooky.wav");
}

function setup (){
  sound.loop();
  createCanvas (600,600)
   torre = createSprite (300,300);
   torre.addImage ("Torre",TorreImg);
   torre.velocityY = 1;
  
   FalsoGroup = new Group ();
   DoorGroup = new Group ();
   barandalGroup = new Group ();
  
   fantasma = createSprite (300,300,50,50);
   fantasma.addImage ("ghost",fantasmaImg);
   fantasma.scale=0.3;
  
   score = 0; 
}

function draw (){
  background (0);
  if ( gameState === "play"){
  
  if (torre.y > 400 ) {
    torre.y = 300;
  }
  if (keyDown ("SPACE")){
    fantasma.velocityY = -10;
  }
  if (keyDown ("left_arrow")){
    fantasma.x = fantasma.x-3;
  }
  if (keyDown ("right_arrow")){
    fantasma.x = fantasma.x+3;
  }
  fantasma.velocityY = fantasma.velocityY+0.8;
  
    score = score + Math.round (getFrameRate()/60);
    textSize(25);
    fill("white");
    text ("Puntuación;"+score, 30,50);
    
      if ( FalsoGroup.isTouching (fantasma) || fantasma.y > 600){
      fantasma.velocityY = 0;
      fantasma.destroy();
      gameState = "end";
    }
  puertas ();
  drawSprites ();
        score = score + Math.round (getFrameRate()/60);
    textSize(25);
    fill("white");
    text ("Puntuación:"+score, 30,50);
    
  }
  if (gameState === "end"){
    stroke ("red");
    fill ("white");
    textSize (30);
    text("GAME OVER",200,300);
  }
}

function puertas (){
  if (frameCount % 240 === 0 ){
    puerta = createSprite (200,-50);
    puerta.x = Math.round (random (120,400));
    puerta.addImage("door",puertaImg);
    puerta.velocityY = 1;
    puerta.lifetime = 800;
    DoorGroup.add (puerta);
    fantasma.depth = puerta.depth + 1;
    //barandal
    barandal = createSprite (200,10);
    barandal.x = puerta.x;
    barandal.addImage ("barandilla",barandalImg);
    barandal.velocityY=1;
    barandal.lifetime=800;
    barandal.scale = 0.8;
    barandalGroup.add (barandal);
    //barandal falso
    barandalfalso = createSprite (200,15)
    barandalfalso.width= barandal.width-20;
    barandalfalso.height=2;
    barandalfalso.x= puerta.x;
    barandalfalso.velocityY = 1;
    barandalfalso.lifetime = 800;
    barandalfalso.debug = true;
    FalsoGroup.add (barandalfalso);
    fantasma.depth = barandal.depth + 1;
  }
}