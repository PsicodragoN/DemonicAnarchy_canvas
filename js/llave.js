/**
  *	JS for Demonic Anarchy
  *
  *	version: 1.0
  *	last modified: 15.10.2015 by Germain Uribe Camacho 
  *
  * @author <a href="mailto:geruricam@hotmail.com">Germain Uribe Camacho</a>
  * <a href="http://psicodragon.xyz/">PsicodragoN</a>
  *
  * @author <a href="mailto:hugo_ver2.0@live.com.mx">Hector Hugo Rivera Gonzalez</a>
  * <a href="http://www.programadorwebfreelance.mx/">Hektor</a>
  */

function Llave(x,y,imagen)
{
	Kinetic.Image.call(this);
	this.setWidth(30);
	this.setX(x);
	this.setY(y);
	this.setImage(imagen);
	this.setHeight(40);
}

Llave.prototype = Object.create(Kinetic.Image.prototype);	// Hereda los metodos de Kinetic.Rec a Llave