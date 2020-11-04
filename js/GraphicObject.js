var GraphicObject = {
  
		
	initGraphicObject: function(imagePath,x,y,width,height){
	  this.img=new Image();
	  this.x=x;
	  this.y=y;
	  this.width=width;
	  this.height=height;
	  this.img.onload=this.draw;
	  this.img.src=imagePath;
	  this.c=0;
  },
  
  draw: function(ctx){
	  ctx.drawImage(this.img,parseInt(this.x),parseInt(this.y),parseInt(this.width),parseInt(this.height));
  },
  
  clear: function(ctx){
	  ctx.clearRect(parseInt(this.x-this.c),parseInt(this.y-this.c),parseInt(this.width+this.c),parseInt(this.height+this.c));
	  ctx.clearRect(parseInt(this.x+this.c),parseInt(this.y+this.c),parseInt(this.width+this.c),parseInt(this.height+this.c));
  }
};