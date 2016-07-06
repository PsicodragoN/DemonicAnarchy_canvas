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

function Enemigo(x,y, imagen)
{
	Kinetic.Image.call(this);	// Llama al constructor del padre

	this.setWidth(60);	// Ancho
	this.setHeight(60);	// Alto
	this.setX(x);	// Coloca en X
	this.setY(y);	// Coloca en Y
	this.contador = 0;	// Contador
	this.setImage(imagen);
	
	this.aleatorio = function(maximo,minimo){	// Genera un numero aleatorio
		var posibles = maximo -minimo; 
		var random = Math.random() * posibles;	// Variable random
		random = Math.floor(random);	// Redondea 
		return parseInt(minimo) + random;	// Convierte en entero y se le suma random
	}

	this.movimiento = function(){
		this.contador++;
		this.setX(this.getX()+ Math.sin(this.contador * Math.PI /50)*5);	// Se le aumenta a X la operación
	}

}

Enemigo.prototype = Object.create(Kinetic.Image.prototype);	// Hereda los metodos de Kinetic.Rec a Enemigo