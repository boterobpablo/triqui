import './styles.css';


const cajas = document.querySelectorAll('.caja');
const contenedor = document.querySelector('.contenedor');
const mensaje = document.querySelector('.mensaje');
const textoMensaje = document.querySelector('.textoMensaje');
const boton = document.querySelector('button');
let turno = true;
let suma = 0;


// evento click cuando hago click a las cajas
const eventoClickEnCajas = (i) => {
    cajas[i].addEventListener('click', () => {

        // comprobar si ya existe un valor en la caja, no hace nada
        if (cajas[i].innerText == 'X' || cajas[i].innerText == 'O') {
            return;
        }

        // turno jugador
        if (turno == true) {
            cajas[i].innerText = 'X';
            cajas[i].classList.add('text-orange-400');
            cajas[i].classList.remove('text-green-400');
            suma++;
            turno = false;
        }

        // turno PC
        let f = numAleatorio();
        do {
            if (suma >= 9) {
                break;
            }

            if (cajas[f].innerText === '') {
                colocarO(f);
            } else {
                do {
                    f = numAleatorio();
                } while (cajas[f].innerText == 'X' || cajas[f].innerText == 'O');
                colocarO(f);
            }
        } while (turno == false);


        // comparar el valor de las cajas y ver si hay 3 en linea
        if (comparacion('X')) {
            setTimeout(() => {
                colocarMensaje('Jugador gana')
            }, 100);
        } else if (comparacion('O')) {
            setTimeout(() => {
                colocarMensaje('Computadora gana')
            }, 100);
        }

        // condicional si la suma llega a 9 ya se completaron todas las cajas
        if (suma >= 9) {
            setTimeout(() => {
                if (textoMensaje.innerText == 'Jugador gana' || textoMensaje.innerText == 'Computadora gana') {
                    return;
                }
                colocarMensaje('Nadie gana')
            }, 100);
        }
    })
}

// poner el evento click a cada una de las cajas
for(let k=0; k<=8; k++){
    eventoClickEnCajas(k);
}

// funcion comparar si hay 3 valores iguales en linea
const comparacion = (valor) => {
    if (
        (comparar(0, valor) && comparar(1, valor) && comparar(2, valor))
        || (comparar(3, valor) && comparar(4, valor) && comparar(5, valor))
        || (comparar(6, valor) && comparar(7, valor) && comparar(8, valor))
        || (comparar(0, valor) && comparar(3, valor) && comparar(6, valor))
        || (comparar(1, valor) && comparar(4, valor) && comparar(7, valor))
        || (comparar(2, valor) && comparar(5, valor) && comparar(8, valor))
        || (comparar(0, valor) && comparar(4, valor) && comparar(8, valor))
        || (comparar(2, valor) && comparar(4, valor) && comparar(6, valor))
    ) return true;
}

// evento click para el boton de aceptar cuando gana alguien
const eventoClickBoton = () => {
    boton.addEventListener('click', () => {
        limpiarCajas();
        mensaje.classList.remove('flex');
        mensaje.classList.add('hidden');
        textoMensaje.innerText = '';
        turno = true;
        suma = 0;
    })
}
eventoClickBoton();

// funcion para comparar el valor de las cajas
const comparar = (i, valor) => cajas[i].innerText == valor;

// funcion para colocar mensaje de quien gana
const colocarMensaje = (msj) => {
    mensaje.classList.add('flex');
    mensaje.classList.remove('hidden');
    textoMensaje.innerText = msj;
}

// funcion para colocar el marcador O
const colocarO = (f) => {
    cajas[f].innerText = 'O';
    cajas[f].classList.add('text-green-400');
    cajas[f].classList.remove('text-orange-400');
    suma++;
    turno = true;
}

// funcion para limpiar cajas cuando acabe el juego
const limpiarCajas = () => {
    for (let caja of cajas) {
        caja.innerText = ''
    }
}

/* Retorna un número aleatorio y redondeado entre min (incluido) 
y max (excluido) */
const numAleatorio = () => {
    return Math.floor(Math.random() * (9 - 0)) + 0;
}

