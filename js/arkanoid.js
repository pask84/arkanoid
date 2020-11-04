var rightBar={};
var leftBar={};
var player={};
var ball={};
var background={};
var sea={};
var levelBricks=new Array();
var pressedKeys={};
var touch={};
var level=0;
var brickCount=0;
var gameContext;
var bricksContext;
var barsContext;
var bgContext;
var seaContext;
var interval=null;
var gameEnded=false;
var partSize;
var barWidth;
var loadInterval;

var KEY = {
		LEFT: 37,
		RIGHT: 39
};

var TOUCH ={
		LEFT:1,
		RIGHT:2
};

$(document).ready(function(){
	loadCount=0;
	canvas = document.getElementById("game");
	gameContext = canvas.getContext("2d");
	
	gameContext.c=1;
	partSize=Math.floor($(window).width()/15);
	
	bg = document.getElementById("bg");
	bgContext = bg.getContext("2d");
	clearScreen(bgContext);
	$.extend(background,Background);
	
	seaCanvas = document.getElementById("sea");
	seaContext = bg.getContext("2d");
	clearScreen(seaContext);
	$.extend(sea,Sea);
		
	bars = document.getElementById("bars");
	barsContext = bars.getContext("2d");
	clearScreen(barsContext);

	$.extend(rightBar,RightBar);

	$.extend(leftBar,LeftBar);
	leftBar.initLeftBar(barsContext);

	barWidth=leftBar.width;

	$.extend(player,Player);

	$.extend(ball,Ball);

	bricks = document.getElementById("bricks");
	bricksContext = bricks.getContext("2d");
	clearScreen(bricksContext);
	
	$(window).resize(function() {
		if(isVertical()) drawChangeOrientation(gameContext);
		else resume();
	});

	resizeAll();
	background.initBackground(bgContext);
	sea.initSea(seaContext,partSize,barWidth);
	rightBar.initRightBar(barsContext);
	leftBar.initLeftBar(barsContext);
	player.initPlayer(gameContext,partSize);
	ball.initBall(partSize);

	$(document).keydown(function(e){
		pressedKeys[e.which] = true;
	});
	$(document).keyup(function(e){
		pressedKeys[e.which] = false;
	});

	$(document).bind("touchstart",function(e) {

		if(event.touches[0].screenX<barWidth) touch[TOUCH.LEFT]=true;
		else if(event.touches[0].screenX>$(window).width()-barWidth) touch[TOUCH.RIGHT]=true;
	});
	$(document).bind("touchend",function(e){
		touch[TOUCH.LEFT]=false;
		touch[TOUCH.RIGHT]=false;
	});

	loadLevel();
});


function initBallPosition(){
	ball.x=player.x+Math.floor(player.width/2)-Math.floor(ball.size/2);
	ball.y=gameContext.canvas.height-(player.height+ball.size);
}

function loadLevel(){
	clearInterval(interval);
	drawLoadScreen(gameContext);
	curlevel=Levels[level];
	brickCount=0;

	for(i=0;i<curlevel.bricks.length;i++){
		for(j=0;j<curlevel.bricks[i].n;j++){
			levelBricks[brickCount]={};
			$.extend(levelBricks[brickCount],curlevel.bricks[i].type);
			levelBricks[brickCount].initSBrick(partSize,curlevel.bricks[i].x,curlevel.bricks[i].y,barWidth);
			levelBricks[brickCount].xRel=curlevel.bricks[i].x+j;
			levelBricks[brickCount].x+=j*levelBricks[brickCount].width;
			maX=bricksContext.canvas.width-barWidth-levelBricks[brickCount].width;
			if(levelBricks[brickCount].x>maX){
				console.error("Brick: superata la dimensione dell'area di gioco");
				break;
			}
			brickCount++;
		}
	}
	
	waitImageComplete();
}


function waitImageComplete(){
	//alert(background.img.complete);
	complete=false;
	if(background.img.complete && sea.img.complete && rightBar.img.complete && leftBar.img.complete 
			&& ball.img.complete && player.img.complete){
		complete=true;
		for(i=0;i<levelBricks.length;i++){
			if(!levelBricks[i].img.complete) complete=false;
		}
	} 
	
	if(complete) drawObjects();
	else setTimeout(function(){waitImageComplete()},500);
}

function drawObjects(){
	console.log("drawObjects");
	//clearInterval(loadInterval);
	clearAll();
	player.initPosition(gameContext);
	initBallPosition();
	if(isVertical()){
		drawChangeOrientation(gameContext);
		return;
	}
	background.draw(bgContext);
	sea.draw(seaContext);
	/*rightBar.draw(barsContext);
	leftBar.draw(barsContext);*/
	drawInfos(barsContext);
	for(i=0;i<levelBricks.length;i++) levelBricks[i].draw(bricksContext);
	ball.draw(gameContext);
	player.draw(gameContext);
	interval=setInterval(gameLoop,50);
}

function clearEvents(){
	touch[TOUCH.LEFT]=false;
	touch[TOUCH.RIGHT]=false;
	pressedKeys[KEY.LEFT] = false;
	pressedKeys[KEY.RIGHT] = false;
}

function gameLoop(){
	if(ball.collide(player)){
		ball.directionY=-1;
		if(ball.x>(player.x+player.width/2)) ball.directionX=1;
		else ball.directionX=-1;
		ball.curSpeedX=Math.random()*ball.speedX;
	}

	ball.clear(gameContext);
	player.clear(gameContext);
	ball.move(gameContext,barWidth);
	player.move(gameContext,barWidth,pressedKeys,touch);		

	ball.draw(gameContext);
	player.draw(gameContext);

	for(i=0;i<levelBricks.length;i++){ 
		if(levelBricks[i].visible==true && ball.collide(levelBricks[i])){ 
			ball.directionY*=-1;
			levelBricks[i].visible=false;
			levelBricks[i].clear(bricksContext);
			brickCount--;
			player.points+=levelBricks[i].getPoints();
			drawInfos(barsContext);
			break;
		}
	}

	if(ball.y>gameContext.canvas.height+ball.size){ 
		player.lifes--;
		drawInfos(barsContext);
		clearEvents();
		ball.clear(gameContext);
		player.clear(gameContext);
		player.initPosition(gameContext);
		initBallPosition();
		if(player.lifes==0){ 
			clearInterval(interval);
			drawGameOver(gameContext);
		}
	}

	if(brickCount==0){
		level++;
		clearInterval(interval);
		if(Levels.length>level) loadLevel();
		else if(Levels.length<=level) drawGameOver(gameContext);
	}
}