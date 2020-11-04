PlayerBar={};
$.extend(PlayerBar,GraphicObject);
$.extend(PlayerBar,{
	
	initPlayerBar: function(ctx,imagePath,position){
		this.refreshDim(partSize,ctx);
		this.initGraphicObject(imagePath,position,0,this.width,this.height);
	},

	refreshDim: function(partSize,ctx){
		this.width=partSize*2;
		this.height=ctx.canvas.height;
	}
});