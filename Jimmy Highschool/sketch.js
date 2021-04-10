var jimmy, jimmyImage1 , jimmyImage2, jimmyImage3;
var ground, gi;
var box,boxGroup, boxImage;
var desk,deskImage , dg;
var BG1, BG2, BG3;
var restart,restartImg;
var score=0;
var gameState=0;
function preload(){
    gi = loadImage("images/ground.png");
    restartImg = loadImage("images/restart.png")
    jimmyImage1 = loadImage("images/playerrun.png");
 jimmyImage2 = loadImage("images/playerkick.png");
 jimmyImage3 = loadImage("images/playerfall.png");
 deskImage = loadImage("images/desk.png");
 BG1 = loadImage("images/BG1");
 BG2 = loadImage("images/BG2");
boxImage = loadImage("images/locker.png");
}
function setup(){
createCanvas(windowWidth,windowHeight);

ground = createSprite(width/2, 450,width,20); 
ground.velocityX = -10;
ground.addImage(gi);
ground.scale=2


restart = createSprite(300,140);
  restart.addImage(restartImg);

 
 boxGroup = new Group();
 dg = new Group();
 jimmy = createSprite(200, height - 330, 50,50);
 jimmy.scale= 0.8;
 jimmy.addImage(jimmyImage1);
 
}
function draw(){
  background("white");
  
score=score+Math.round(frameCount/60);
stroke("yellow");
textSize(40)
text("Score:"+score,windowWidth-200,windowHeight-500);
    if(keyDown(UP_ARROW)){
        jimmy.y-=50
        jimmy.addImage(jimmyImage1);
    }
    if(keyDown(DOWN_ARROW)){

        jimmy.y+=3
        jimmy.addImage(jimmyImage2);
        jimmy.scale= 0.8;
       // Jreturn();
        jimmy.setCollider("circle",0,0,40)
    }
 /*   if(keyDown(LEFT_ARROW)){
        jimmy.x-=3
    }
    if(keyDown(RIGHT_ARROW)){
        jimmy.x+=5
    }*/
    if(ground.x<0){
        ground.x = windowWidth/2;
    }
    jimmy.velocityY+=0.8
    //console.log(windowWidth)
   
    jimmy.collide(ground);  
    //jimmy.debug=true;
    if(gameState === 0){
    Objects();  
    restart.visible = false;
    if(boxGroup.isTouching(jimmy)){
        jimmy.velocityY=0
        jimmy.velocityX=0
        boxGroup.setLifetimeEach(-1);
        boxGroup.setVelocityXEach(0);
        jimmy.addImage(jimmyImage3);
        gameState = 2
       //console.log("gameOver");
    }
    if(score>3000){
        gameState = 1;
        }}
    if (gameState === 1){
        Objects2();
        boxGroup.destroyEach();
        console.log(jimmy.x);
        jimmy.x=200;
        if(dg.isTouching(jimmy)){
            jimmy.velocityY=0
            jimmy.velocityX=0
            dg.setLifetimeEach(-1);
            dg.setVelocityXEach(0);
            jimmy.addImage(jimmyImage3);
            gameState = 2
           //console.log("gameOver");
        }}
        if(gameState === 2){
            restart.visible = true;
            reset()
            End()
        }
    drawSprites();
}
function Objects(){
    if(frameCount %200 === 0){
        box = createSprite(width,370,50,50);
        box.addImage(boxImage);
        box.scale = 0.5
        box.velocityX=-4;
        var rand = Math.round(random(1,2));
        //console.log(rand)
        switch(rand){
            case 1: box.y=300;
            break;
            case 2: box.y=400;
            break;
            default: break;
        }
        box.lifetime=width/4;
        boxGroup.add(box);
    }
}
function Objects2(){
    if(frameCount %200 === 0){
        desk = createSprite(width,380,100,50);
      desk.addImage(deskImage);
       desk.scale = 0.5
      desk.velocityX=-4;
        var rand = Math.round(random(1,2));
       jimmy.depth=desk.depth;
       jimmy.depth+=1;
        desk.lifetime=width/4
        dg.add(desk);
       
    }
}
function End(){
    background("black")
    dg.destroyEach();
    fill("red")
    textSize(40)
    text("YOU LOOSE !!", windowWidth - 900, windowHeight - 200);
}
function reset(){
  //  gameOver.visible = false;
    restart.visible = false;
    jimmy.changeAnimation("running", jimmyImage1);
    score=0;
    gameState=0;
  }
  