function drawLoadScreen(ctx){
	clearScreen(ctx);
	ctx.textAlign="center";
	ctx.fillText("Loading...",Math.floor(gameContext.canvas.width/2),Math.floor(gameContext.canvas.height/2));
}

function clearScreen(ctx){
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}

function clearAll(){
	clearScreen(gameContext);
	clearScreen(bricksContext);
	clearScreen(barsContext);
	clearScreen(bgContext);
	clearScreen(seaContext);
}

function resizeAll(){
	resizeCanvas(gameContext);
	resizeCanvas(bricksContext);
	resizeCanvas(barsContext);
	resizeCanvas(bgContext);
	resizeCanvas(seaContext);
}

function drawGameOver(){
	gameEnded=true;
	clearAll();
	bgContext.textAlign="center";
	bgContext.fillText("Game Over",Math.floor(gameContext.canvas.width/2),Math.floor(gameContext.canvas.height/2));
}

function drawInfos(ctx){
	clearScreen(ctx);
	ctx.textAlign="center";
	ctx.fillStyle = "#ffffff";	
	textDim=Math.floor(partSize/5);
	ctx.font =textDim+"pt Calibri";
	ctx.fillText("Lifes:"+player.lifes,Math.floor(barWidth/2),textDim);
	ctx.fillText("Points:"+player.points,Math.floor(barWidth/2),textDim*3);
}

function drawChangeOrientation(){
	if(!gameEnded){
		pause();
		clearAll();
		gameContext.textAlign="center";
		gameContext.fillText("Please change the orientation",Math.floor(gameContext.canvas.width/2),Math.floor(gameContext.canvas.height/2));
		console.log("vertical");
	}
}

function resizeCanvas(ctx){
	ctx.canvas.width=$(window).width();
	ctx.canvas.height=$(window).height();
}

function isVertical(){
	if(document.documentElement.clientHeight>document.documentElement.clientWidth) return true;
	else return false;
}

function pause(){
	if(interval!=null){
		clearInterval(interval);
	}
}

function resume(){
	if(!gameEnded){
		clearInterval(interval);
		clearAll();
		partSize=Math.floor($(window).width()/15);
		resizeAll();
		player.initPosition(gameContext);
		initBallPosition();
		
		background.refreshDim(bgContext);
		sea.refreshDim(partSize,seaContext);
		sea.refreshPos(partSize,barWidth,seaContext);
		leftBar.refreshDim(partSize,barsContext);
		rightBar.refreshDim(partSize,barsContext);
		rightBar.refreshPos(barsContext);
		player.refreshDim(partSize);
		ball.refreshDim(partSize);
		
		barWidth=rightBar.width;
		
		ball.draw(gameContext);
		player.draw(gameContext);
		/*rightBar.draw(barsContext);
		leftBar.draw(barsContext);*/
		background.draw(bgContext);
		sea.draw(seaContext);
		drawInfos(barsContext);
		countBrick=0;
		yPrev=levelBricks[0].y;
		for(i=0;i<levelBricks.length;i++){ 
			if(yPrev!=levelBricks[i].y){
				countBrick=0;
				yPrev=levelBricks[i].y;
			}
			levelBricks[i].refreshDim(Math.floor(partSize));
			levelBricks[i].refreshPos(levelBricks[i].xRel,levelBricks[i].yRel,barWidth);
			if(levelBricks[i].visible){
				levelBricks[i].draw(bricksContext);
			}
			countBrick++;
		}
		interval=setInterval(gameLoop,50);
		console.log("resume");
	}
}