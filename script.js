const botonSubmit = document.querySelector("#guess-button");
const campoTexto = document.querySelector("#guess-input");
const GRID = document.getElementById("grid");
let diccionario = [
  "APPLE",
  "HURLS",
  "WINGS",
  "YOUTH",
  "FLOWER",
  "HORSE",
  "GRASS",
  "FRUIT",
  "WATER",
  "GREEN",
];
let intentos = 6;

//Funcionalidad
botonSubmit.addEventListener("click", worlde);

//Obtenemos una palabra random
const diccionarioRandom =
  diccionario[Math.floor(Math.random() * diccionario.length)];
console.log(diccionarioRandom);

//Funcion para ver el worddle
function worlde() {
  const palabra = leerPalabra();
  const longitud = palabra.length;

  //Verificamos que no este vacio el input, asi como que tambien la longitud sea de 5 caracteres
  if (palabra === "" || longitud !== 5) {
    alert("Ingrese una palabra de 5 letras");
    return;
  }

  const ROW = document.createElement("div");
  ROW.className = "row";
  for (const i in diccionarioRandom) {
    //Creamos el span
    const SPAN = document.createElement("span");
    //Le agregamos la propiedad class
    SPAN.className = "letter";

    //Si el caracter en la misma posicion que el caracter de la palabra a adiviar, mostramos verde
    if (palabra[i] === diccionarioRandom[i]) {
      SPAN.innerHTML = palabra[i];
      SPAN.style.backgroundColor = "#79b851"; //Verde

      //Si la palabra generada random, contiene algun caracter de la palabra que ingreso el usuario, mostramos amarillo
    } else if (diccionarioRandom.includes(palabra[i])) {
      SPAN.innerHTML = palabra[i];
      SPAN.style.backgroundColor = "#f3c237"; //Amarillo

      //Si no contiene ningun carcater igual o no se encuentran en la misma posicion, mostramos gris
    } else {
      SPAN.innerHTML = palabra[i];
      SPAN.style.backgroundColor = "#a4aec4"; //Gris
    }
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);

  //Decrementamos los intentos restantes
  --intentos;

  //Si la palabra que ingreso el usuario es igual a la palabra random, gana
  if (palabra === diccionarioRandom) {
    terminar("<h1>GANASTE!😀</h1>");
    return;
  }

  //Si los intentos llegan a 0, pierde
  if (intentos === 0) {
    terminar("<h1>PERDISTE!😖</h1>");
    return;
  }
}

//Leemos la palabra del usuario, obtenemos el valor y lo devolvemos en mayusculas
function leerPalabra() {
  let word = campoTexto.value;
  return word.toUpperCase();
}

//Funcion para hacer una inyeccion html
function terminar(mensaje) {
  campoTexto.disabled = true;
  botonSubmit.disabled = true;
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}
