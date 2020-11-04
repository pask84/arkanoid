Brick={};
$.extend(Brick,GraphicObject);
$.extend(Brick,{
	initBrick: function(partSize,imagePath,x,y,barWidth){
		this.visible=true;
		this.yRel=y;
		this.xRel=x;
		this.refreshDim(partSize);
		this.refreshPos(x,y,barWidth);
		this.initGraphicObject(imagePath,this.x,this.y,this.width,this.height);
	},
	
	refreshDim: function(partSize){
		this.width=partSize;
		this.height=Math.floor(partSize/2);
	},
	
	refreshPos: function(x,y,barWidth){
		this.x=x*this.width+barWidth;
		this.y=y*this.height;
	},
	
	getPoints: function(){
		return 10;
	}

});
