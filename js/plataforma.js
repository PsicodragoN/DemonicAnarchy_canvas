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

function Plataforma(x,y,imagen)
{
	Kinetic.Rect.call(this);	// Llama al constructor del padre

	this.setWidth(200);	// Ancho
	this.setHeight(40);	// Alto
	this.setX(x);	// Coloca en X
	this.setY(y);	// Coloca en Y
	this.setFillPatternImage(imagen);	// Define una imagen como textura
}

Plataforma.prototype = Object.create(Kinetic.Rect.prototype);	// Hereda los metodos de Kinetic.Rec a Plataforma