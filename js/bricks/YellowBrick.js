YellowBrick={};
$.extend(YellowBrick,Brick);
$.extend(YellowBrick,{
	initSBrick: function(partSize,x,y,barWidth){
		this.initBrick(partSize,"images/YellowBrick.png",x,y,barWidth);
	}
});
