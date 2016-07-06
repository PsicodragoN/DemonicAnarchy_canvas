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

var framesP = 
{
	estatico: [{
		x: 30,
        y: 0,
        width: 65,
        height: 79
	}],
    caminar: [{
        x: 30,
        y: 0,
        width: 65,
        height: 79
    }, {
        x: 109,
        y: 0,
        width: 65,
        height: 79
    }, {
        x: 188,
        y: 0,
        width: 65,
		height: 79
	}, {
		x: 267,
		y: 0,
		width: 65,
		height: 79
	}, {
		x: 346,
		y: 0,
		width: 65,
		height: 79
	}, {
		x: 425,
		y: 0,
		width: 65,
		height: 79
	}],
    saltarFrames: [{
        x: 109,
        y: 70,
        width: 65,
        height: 79
    }, {
        x: 188,
        y: 70,
        width: 65,
        height: 79
    },{
        x: 188,
        y: 70,
        width: 65,
        height: 79
    }, {
        x: 267,
        y: 70,
        width: 65,
		height: 79
	}, {
        x: 267,
        y: 70,
        width: 65,
		height: 79
	}, {
		x: 346,
		y: 70,
		width: 65,
		height: 79
	}, {
		x: 346,
		y: 70,
		width: 65,
		height: 79
	}, {
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	}]
};

var nivel, fondo, grupoAssets, puntuacion, imagenFondo;	// Se declara la variable nivel y fondo
var teclado = {}; // Se declara la variable nivel
var intervalo;
var personaje;	// Se declara la variable personaje
var gravedad = 0.8;	// Velocidad de la gravedad del personaje
var rebote = 0;	// Rebote del personaje
var juego = new Game();
var b = false;

var imgPersonaje = new Image();
imgPersonaje.src = 'images/personaje.png';

var imgEnemigo = new Image();
imgEnemigo.src = 'images/enemigo.png';

var imgPlataforma = new Image();
imgPlataforma.src = 'images/plataforma.png';

var imgLlave = new Image();
imgLlave.src = 'images/llave.png';

var imgPortal = new Image();
imgPortal.src = 'images/portal.png';

var imgOrbe = new Image();
imgOrbe.src = 'images/orbe.png';

var imgFondo = new Image();
imgFondo.src = 'images/fondo.png';

var imgFondo2 = new Image();
imgFondo2.src = 'images/fondo2.png';

/* Sonidos */
/*
var jumpID = "jump";
var fondoID = "fondo";
var orbeID = "orbe";
var matarID = "matar";

      function loadSound () {
        createjs.Sound.registerSound("audio/jump.mp3", jumpID);
        createjs.Sound.registerSound("audio/fondo.mp3", fondoID);
        createjs.Sound.registerSound("audio/orbe.mp3", orbeID);
        createjs.Sound.registerSound("audio/matar.mp3", matarID);
      }


      function jumping () {
        createjs.Sound.play(jumpID);
      }

      function fondoMusica (){
        createjs.Sound.play(fondoID);
      }

      function fondoStop() {
        createjs.Sound.stop(fondoID);
      }

      function orbe () {
        createjs.Sound.play(orbeID);
      }

      function matar () {
        createjs.Sound.play(matarID);
      }

   */  



grupoAssets = new Kinetic.Group({
	x :0,
	y: 0
});

nivel = new Kinetic.Stage({ //Creamos un objeto de la clase Kinetic.Stage
	container: 'juego',	// Contenedor del juego
	width: 960,	// Ancho
	height: 500,	// Altura
});

/* Puntuacion */
puntuacion = new Kinetic.Text({
	text:'Puntuación: 0',
	height: 25,
	width: 150,
	x:nivel.getWidth()-150,
	y:0,
	fill:'#fff',
	fonFamily:'Arial',
	fontSize:20
});

/* Nivel */
nivelText = new Kinetic.Text({
	text:'Nivel: ',
	height: 25,
	width: 150,
	x:0,
	y:0,
	fill:'#fff',
	fonFamily:'Arial',
	fontSize:20
});

/* Imagen de fondo*/
imagenFondo = new Kinetic.Image({
	x: 0,
	y: 0,
	image: imgFondo,
	width: nivel.getWidth(),
	height: nivel.getHeight()
});

/* Imagen de fondo 2*/
imagenFondo2 = new Kinetic.Image({
	x: 0,
	y: 0,
	image: imgFondo2,
	width: nivel.getWidth(),
	height: nivel.getHeight()
});

/* Nivel 1 */
function nivel1(){

	if(b) return;
	b = true;

	juego.puntuacion = 0;
	juego.llave = true;

	fondo = new Kinetic.Layer();

	/* Enemigos */
	grupoAssets.add(new Enemigo(200,nivel.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(850,nivel.getHeight()/3.9-60,imgEnemigo));
	grupoAssets.add(new Enemigo(170,nivel.getHeight()/3-60,imgEnemigo));
	grupoAssets.add(new Enemigo(1020,nivel.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(1120,nivel.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(1220,nivel.getHeight()-75,imgEnemigo));

	/* Plataformas */
	var piso = new Plataforma(0,nivel.getHeight()-15);
	piso.setWidth(nivel.getWidth()*2);
	grupoAssets.add(piso);
	grupoAssets.add(new Plataforma(20,nivel.getHeight()/1.5,imgPlataforma));
	grupoAssets.add(new Plataforma(190,nivel.getHeight()/3,imgPlataforma));
	grupoAssets.add(new Plataforma(510,nivel.getHeight()/1.6,imgPlataforma));
	grupoAssets.add(new Plataforma(870,nivel.getHeight()/3.9,imgPlataforma));

	/* Orbes */
	grupoAssets.add(new Orbe(350,nivel.getHeight()/3-130,imgOrbe));
	grupoAssets.add(new Orbe(650,nivel.getHeight()/2-130,imgOrbe));	
	grupoAssets.add(new Orbe(80,nivel.getHeight()-80,imgOrbe));	
	grupoAssets.add(new Orbe(910,nivel.getHeight()/6,imgOrbe));	
	grupoAssets.add(new Orbe(1220,nivel.getHeight()-80,imgOrbe));

	/* Portal */
	grupoAssets.add(new Portal(1200,nivel.getHeight()-85,imgPortal));

	/* Personaje */
	personaje = new Personaje(imgPersonaje,framesP);	// Instancia del personaje
	personaje.setX(0);	// Coordenada X
	personaje.setY(nivel.getHeight() - personaje.getHeight());	// Coordenada Y
	personaje.limiteDer = nivel.getWidth() - personaje.getWidth();	// Limite derecho
	personaje.limiteArriba = nivel.getHeight();
	
	fondo.add(imagenFondo);
	fondo.add(personaje);	// Agrega al personaje
	fondo.add(grupoAssets);
	fondo.add(puntuacion);
	fondo.add(nivelText);
	personaje.start();
	nivel.add(fondo);	// Agregamos el fondo
	intervalo = setInterval(frameLoop,1000/20);

	//fondoMusica();
}

/* Nivel 2 */
function nivel2(){
	//fondoStop();

	fondo = new Kinetic.Layer();

	juego.llave = false;

	/* Enemigos */
	grupoAssets.add(new Enemigo(200,nivel.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(850,nivel.getHeight()/3.9-60,imgEnemigo));
	grupoAssets.add(new Enemigo(170,nivel.getHeight()/3-60,imgEnemigo));
	grupoAssets.add(new Enemigo(1020,nivel.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(1120,nivel.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(1220,nivel.getHeight()-75,imgEnemigo));

	/* Plataformas */
	var piso = new Plataforma(0,nivel.getHeight()-15);
	piso.setWidth(nivel.getWidth()*2);
	grupoAssets.add(piso);
	grupoAssets.add(new Plataforma(20,nivel.getHeight()/1.5,imgPlataforma));
	grupoAssets.add(new Plataforma(190,nivel.getHeight()/3,imgPlataforma));
	grupoAssets.add(new Plataforma(510,nivel.getHeight()/1.6,imgPlataforma));
	grupoAssets.add(new Plataforma(870,nivel.getHeight()/3.9,imgPlataforma));

	/* Orbes */
	grupoAssets.add(new Orbe(350,nivel.getHeight()/3-130,imgOrbe));
	grupoAssets.add(new Orbe(650,nivel.getHeight()/2-130,imgOrbe));	
	grupoAssets.add(new Orbe(80,nivel.getHeight()-80,imgOrbe));	
	grupoAssets.add(new Orbe(910,nivel.getHeight()/6,imgOrbe));	
	grupoAssets.add(new Orbe(1220,nivel.getHeight()-80,imgOrbe));

	/* Llave */
	grupoAssets.add(new Llave(850,nivel.getHeight()-85,imgLlave));

	/* Portal */
	grupoAssets.add(new Portal(910,nivel.getHeight()-85,imgPortal));

	/* Personaje */
	personaje = new Personaje(imgPersonaje,framesP);	// Instancia del personaje
	personaje.setX(0);	// Coordenada X
	personaje.setY(nivel.getHeight() - personaje.getHeight());	// Coordenada Y
	personaje.limiteDer = nivel.getWidth() - personaje.getWidth();	// Limite derecho
	personaje.limiteArriba = nivel.getHeight();
	
	fondo.add(imagenFondo2);
	fondo.add(personaje);	// Agrega al personaje
	fondo.add(grupoAssets);
	fondo.add(puntuacion);
	fondo.add(nivelText);
	personaje.start();
	nivel.add(fondo);	// Agregamos el fondo
	intervalo = setInterval(frameLoop,1000/20);
}

function moverPersonaje(){
	if (personaje.getAnimation() != 'caminar' && (teclado[37] || teclado[39])) {
		personaje.setAnimation('caminar');
	}
	if(teclado[37]){	// Tecla izquierda
		personaje.retroceder();
	}
	if(teclado[39]){	// Tecla derecha
		personaje.caminar();
	}
	if(teclado[38] && personaje.contador < 1){	// Tecla arriba
		personaje.saltar();

	}
	if(!(teclado[39] || teclado[38] || teclado[37]) && !personaje.estaSaltando){
		personaje.setAnimation('estatico');
	}
}

function addKeyBoardEvents(){	// Funcion que agrega las teclas
	addEvent(document, "keydown", function(e){	// Agregamos un evento
		teclado[e.keyCode] = true;
	});	

	addEvent(document, "keyup", function(e){	// Agregamos un evento
		teclado[e.keyCode] = false;
	});	

	function addEvent(element, eventName, func){	// Funcion que agrega los eventos
		if (element.addEventListener){
			element.addEventListener(eventName, func, false);	// Firefox, Chrome
		}
		else if(element.attachEvent){
			element.attachEvent(eventName, func);	// Explorer
		}
	}
}

function hit(a,b){	// Funcion que detecta las colisiones
	var hit = false;
	// Colisiones horizontales
	if(b.getX() + b.getWidth() >= a.getX() && b.getX() < a.getX() + a.getWidth())
	{
		//Colisiones verticales
		if(b.getY() + b.getHeight() >= a.getY() && b.getY() < a.getY() + a.getHeight())
			hit = true;
	}
	// Colisión de a con b
	if(b.getX() <= a.getX() && b.getX() + b.getWidth() >= a.getX() + a.getWidth())
	{
		if(b.getY() <= a.getY() && b.getY() + b.getHeight() >= a.getY() + a.getHeight())
			hit = true;
	}
	// Colisión b con a
	if(a.getX() <= b.getX() && a.getX() + a.getWidth() >= b.getX() + b.getWidth())
	{
		if(a.getY() <= b.getY() && a.getY() + a.getHeight() >= b.getY() + b.getHeight())
			hit = true;
	}
	return hit;
}

function movimientoEnemigos(){
	var enemigos = grupoAssets.children;
	
	for(i in enemigos){
		var enemigo = enemigos[i];
		if(enemigo instanceof Enemigo)	// Si la clase de Enemigo es enemigo, devuleve true
		enemigo.movimiento();
	}
}

function movimientoFondo(){
	if(personaje.getX() > (nivel.getWidth()/2) && teclado[39]){
		personaje.vx = 2;
		for(i in grupoAssets.children){
			var asset = grupoAssets.children[i];
			asset.move(-5,0);
		}
	}
}

function aplicarVariables(){
	personaje.gravedad(gravedad,rebote);
}

function colisionplataforma(){
	var plataformas = grupoAssets.children;
	for (i in plataformas) {
		var plataforma = plataformas[i];
		if (hit(plataforma, personaje)) {
			if (plataforma instanceof Enemigo) {
				if (personaje.vy > 2 && personaje.getY() < plataforma.getY()){
					//matar();	// Ejecuta la variable del sonido
					plataforma.remove();
					juego.puntuacion += 5;
				}
				else{	// Funcion perder	
					grupoAssets.removeChildren();
					document.querySelector('#lose').style.display = 'block';
					document.querySelector('#juego').style.display = 'none';
					document.querySelector('#score').innerHTML = juego.puntuacion;
					window.clearInterval(intervalo);
					b = false;

					juego.nivel = 1;
					//fondoStop();
				}
			}
			else if (plataforma instanceof Plataforma && personaje.getY() < plataforma.getY() && personaje.vy > 0){
				// Comportamiento
				personaje.contador = 0;	// Reiniciamos el contador
				personaje.setY(plataforma.getY() - personaje.getHeight());	// Posicion del personaje para dejarlo arriba de la plataforma
				personaje.vy *= rebote; // Velocidad de caida por rebote
			}

			else if (plataforma instanceof Orbe) {
				//orbe();	// Ejecuta la variable del sonido
				plataforma.remove();
				juego.puntuacion++;
			}
			else if(plataforma instanceof Llave){
				plataforma.remove();
				juego.llave = true;
				continue;
			}
			else if (plataforma instanceof Portal && juego.llave) {
				if (juego.nivel == 1){
					grupoAssets.removeChildren();
					window.clearInterval(intervalo);
					juego.nivel = 2;
					nivel2();
				}
				else if (juego.nivel == 2){	// Funcion ganar
					grupoAssets.removeChildren();
					document.querySelector('#win').style.display = 'block';
					document.querySelector('#juego').style.display = 'none';
					document.querySelector('#score').innerHTML = juego.puntuacion;
					window.clearInterval(intervalo);
					b = false;

					juego.nivel = 1;
				}
			}
		}
	}
}

function actualizarPuntuacion(){
	puntuacion.setText('Puntuación: '+juego.puntuacion);
	nivelText.setText('Nivel: '+juego.nivel);
}

addKeyBoardEvents();

function frameLoop(){	// Funcion para ejecutar los frames
	actualizarPuntuacion();
	aplicarVariables();
	colisionplataforma();
	movimientoFondo();
	moverPersonaje();
	movimientoEnemigos();
	nivel.draw();
}