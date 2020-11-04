Background={};
$.extend(Background,GraphicObject);
$.extend(Background,{
	
	initBackground: function(ctx){
		console.log("initBackground");
		this.initGraphicObject("images/background.jpg",0,0,ctx.canvas.width,ctx.canvas.height);
	},

	refreshDim: function(ctx){
		this.width=ctx.canvas.width;
		this.height=ctx.canvas.height;
	}
});