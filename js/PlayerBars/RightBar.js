RightBar={};
$.extend(RightBar,PlayerBar);
$.extend(RightBar,{
	initRightBar: function(ctx){
		this.initPlayerBar(ctx,"images/RightBar.png",0);
		this.refreshPos(ctx);
	},

	refreshPos: function(ctx){
		this.x=Math.floor(ctx.canvas.width-this.width);
	}
});