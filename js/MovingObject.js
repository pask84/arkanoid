MovingObject={};

$.extend(MovingObject,GraphicObject);

$.extend(MovingObject,{

	initMovingObject : function(imagePath,x,y,width,height,directionX,directionY,speedX,speedY){
		this.directionX=directionX;
		this.directionY=directionY;
		this.speedX=speedX;
		this.speedY=speedY;
		this.initGraphicObject(imagePath,x,y,width,height);
		this.c=1;
	}
});
