Ball={};
$.extend(Ball,MovingObject);
$.extend(Ball,{

	initBall: function(partSize){
		this.curSpeedX=0;
		this.refreshDim(partSize);
		this.initMovingObject("images/ball.png",0,0,this.size,this.size,-1,1,this.speed,this.speed);
	},
	
	move: function(ctx,barWidth){
		if(this.y<=0) this.directionY=1;
		if(this.x>ctx.canvas.width-this.size-barWidth) this.directionX=-1;
		else if(this.x<=barWidth) this.directionX=1;

		this.y+=this.speedY*this.directionY;
		this.x+=this.curSpeedX*ball.directionX;
	},

	collide: function(obj){
		c=0;
		if(this.x+this.width>obj.x && this.x<obj.x+obj.width){
			if(this.directionY==1){
				if(this.y+this.height>obj.y && obj.y>this.y){ 
					return true;
				}
			}
			else if(this.directionY==-1){
				if(this.y<obj.y+obj.height && obj.y<this.y){ 
					return true;
				}
			}
		}
		return false;
	},
	
	refreshDim: function(partSize){
		this.width=Math.floor(partSize/2);
		this.height=this.width;
		this.size=this.width;
		this.speed=Math.floor(partSize/5);
	}
});
