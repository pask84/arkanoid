Sea={};
$.extend(Sea,GraphicObject);
$.extend(Sea,{
	
	initSea: function(ctx,partSize,barWidth){
		this.refreshDim(partSize,ctx);
		this.refreshPos(partSize,barWidth,ctx);
		this.initGraphicObject("images/sea.png",this.x,this.y,this.width,this.height);
	},

	refreshDim: function(partSize,ctx){
		this.width=Math.floor(ctx.canvas.width-barWidth*2)-Math.floor(partSize/2);
		this.height=Math.floor(partSize/3);
		
	},
	
	refreshPos: function(partSize,barWidth,ctx){
		this.x=barWidth+Math.floor(partSize/4);
		this.y=Math.floor(ctx.canvas.height-this.height);
	}
});