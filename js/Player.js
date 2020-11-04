Player={};
$.extend(Player,MovingObject);
$.extend(Player,{
	
	initPlayer: function(ctx,partSize){
		this.refreshDim(partSize);
		this.initPosition(ctx);
		this.initMovingObject("images/player.png",this.x,this.y,this.width,this.height,1,1,this.speed,0);
		this.lifes=5;
		this.points=0;
	},
	
	move: function(ctx,barWidth,keyPressed,touch){
		if(keyPressed[KEY.LEFT] || touch[TOUCH.LEFT]){ 
			if(this.x>barWidth+Math.floor(this.speedX)) this.x-=this.speedX;
			this.directionX=-1;
		}
		else if(keyPressed[KEY.RIGHT] || touch[TOUCH.RIGHT]){ 
			if(this.x<ctx.canvas.width-this.width-barWidth-Math.floor(this.speedX)) this.x+=this.speedX;
			this.directionX=1;
		}
	},
	
	initPosition: function(ctx){
		this.x=Math.floor(ctx.canvas.width/2)-Math.floor(this.width/2);
		this.y=ctx.canvas.height-this.height-1;
	},
	
	refreshDim: function(partSize){
		this.width=Math.floor(partSize*1.5);
		this.height=Math.floor(partSize/2);
		this.speed=Math.floor(partSize/4);
	}
});


