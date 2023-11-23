
/// Obtén las piezas del rompecabezas
var piezas = document.getElementsByClassName('movil');

// Tamaño de las piezas
var tamWidth = [134, 192, 134, 163, 134, 163, 134, 192, 134];
var tamHeight = [163, 134, 163, 134, 192, 134, 163, 134, 163];

// Variables de posición
var elementSelect = null;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

// Itera sobre todas las piezas
for (var i = 0; i < piezas.length; i++) {
    piezas[i].setAttribute("width", tamWidth[i]);
    piezas[i].setAttribute("height", tamHeight[i]);
    piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
    piezas[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
    // Establece eventos tanto para clic/tocar como para mover
    piezas[i].addEventListener("mousedown", seleccionarElemento);
    piezas[i].addEventListener("touchstart", seleccionarElemento);
}

// Función para seleccionar una pieza del rompecabezas
function seleccionarElemento(evt) {
    evt.preventDefault(); // Evita el comportamiento predeterminado, como seleccionar texto

    // Establece el elemento seleccionado y las posiciones actuales
    elementSelect = evt.target;
    currentX = evt.type === "mousedown" ? evt.clientX : evt.touches[0].clientX;
    currentY = evt.type === "mousedown" ? evt.clientY : evt.touches[0].clientY;
    currentPosX = parseFloat(elementSelect.getAttribute("x"));
    currentPosY = parseFloat(elementSelect.getAttribute("y"));

    // Establece eventos tanto para mover como para soltar
    document.addEventListener("mousemove", moverElemento);
    document.addEventListener("touchmove", moverElemento);
    document.addEventListener("mouseup", deseleccionarElemento);
    document.addEventListener("touchend", deseleccionarElemento);
}

// Función para mover la pieza seleccionada
function moverElemento(evt) {
    evt.preventDefault();

    // Calcula el desplazamiento
    var dx = evt.type === "mousemove" ? evt.clientX - currentX : evt.touches[0].clientX - currentX;
    var dy = evt.type === "mousemove" ? evt.clientY - currentY : evt.touches[0].clientY - currentY;
    
    // Actualiza las posiciones actuales
    currentPosX += dx;
    currentPosY += dy;

    // Mueve la pieza a la nueva posición
    elementSelect.setAttribute("x", currentPosX);
    elementSelect.setAttribute("y", currentPosY);

    // Actualiza las posiciones actuales
    currentX = evt.type === "mousemove" ? evt.clientX : evt.touches[0].clientX;
    currentY = evt.type === "mousemove" ? evt.clientY : evt.touches[0].clientY;

	iman();
}

// Función para deseleccionar la pieza
function deseleccionarElemento(evt) {
	testing();
    evt.preventDefault();

    // Elimina los eventos de mover y soltar
    document.removeEventListener("mousemove", moverElemento);
    document.removeEventListener("touchmove", moverElemento);
    document.removeEventListener("mouseup", deseleccionarElemento);
    document.removeEventListener("touchend", deseleccionarElemento);
}


//Hacer que las piezas no se superpongan entre ellas
function reordenar (evt) {
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}

//Posiciones correctas de la imagen
var origX = [200,304,466,200,333,437,200,304,466];
var origY = [100,100,100,233,204,233,337,366,337];

function iman () {
	for (var i = 0; i < piezas.length; i++) {
		if(Math.abs(currentPosX-origX[i])<15 && Math.abs(currentPosY-origY[i])<15){
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	};
}

function testing () {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for (var i = 0; i < piezas.length; i++) {
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			bien_ubicada++;
		}
	}
	if(bien_ubicada==9)
    {
        Swal.fire({
            title: "¡Felicitaciones!",
            text: "Has completado correctamente el puzzle",
            icon: "success",
        });
    }
}
