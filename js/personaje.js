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

function Personaje(imagen,animaciones)
{
	Kinetic.Sprite.call(this);	// Llama al constructor del padre

	this.setWidth(40);	// Ancho
	this.setHeight(70);	// Alto
	this.attrs.image = imagen;	// Variable para el sprite
	this.setAnimations(animaciones);
	this.setAnimation('caminar');
	this.estaSaltando = false;
	this.vx = 15;	// Velocidad de X
	this.vy = 0;	// Velocidad de Y
	this.limiteDer = 0;	// Limite X
	this.limiteArriba = 0; // Limite Y
	this.direccion = true; // Permite la movilidad del personaje
	this.contador = 0;	// Contador
	this.attrs.frameRate = 10;	// Velocidad de las animaciones
	
	this.caminar = function(){
		if(this.direccion) this.move(this.vx,0);	// Movimiento en X
		else{
			this.attrs.drawFunc = function (a){	// Sobreesciibe la funcion drawimagen
				var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;
				f&&e.drawImage(f,d.x,d.y,d.width,d.height,0,0,d.width,d.height)
			}

			this.setScale({x:1});
			this.direccion = true;
		}
		if(this.getX() > this.limiteDer) this.move(this.limiteDer - this.getX(),0);	// Mueve hacia adelante al personaje el numero de coordenadas indicado
	}

	this.saltar = function(){

		this.estaSaltando = true;

		if(this.vy <= 2){
			this.setAnimation('saltarFrames');
			this.vy = -20;
			this.contador++;
			this.afterFrame(10,function(){	// Despues de ejecutar el frame Salto ejecuta el frame Static
			this.estaSaltando = false;
			this.setAnimation('estatico');
		});
			//jumping();
		}
	}

	this.retroceder = function(){
		if(!this.direccion) this.move(-15,0);	// Movimiento en X
		else{
			this.attrs.drawFunc = function (a){	// Sobreesciibe la funcion drawimagen
				var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;
				f&&e.drawImage(f,d.x,d.y,d.width,d.height,-d.width,0,d.width,d.height)
			}

			this.setScale({x:-1});
			this.direccion = false;
		}
		if(this.getX() < 0) this.move(-this.getX(),0);	// Mueve hacia atras al personaje el numero de coordenadas indicado
	}

	this.gravedad = function(gravedad,rebote){
		this.vy += gravedad;
		this.move(0,this.vy);	// Mueve n pixeles en Y
		if((this.getY() + this.getHeight()) > this.limiteArriba){
			this.setY(this.limiteArriba - this.getHeight());
			this.vy = 0;
			this.contador = 0;
		}
	}

}

Personaje.prototype = Object.create(Kinetic.Sprite.prototype);	// Hereda los metodos de Kinetic.Rec a Personaje