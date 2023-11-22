// 1.
const titleText = document.title;
console.log(titleText);

// 3.
document.addEventListener('DOMContentLoaded', function () {
var integrante1 = obtenerNombreCompleto(1);
var integrante2 = obtenerNombreCompleto(2);

console.log('-----');
console.log(`Integrante 1: "${integrante1.primerNombre} ${integrante1.segundoNombre ? integrante1.segundoNombre + ' ' : ''}${integrante1.primerApellido} ${integrante1.segundoApellido}"`);
console.log(`Integrante 2: "${integrante2.primerNombre} ${integrante2.segundoNombre ? integrante2.segundoNombre + ' ' : ''}${integrante2.primerApellido} ${integrante2.segundoApellido}"`);
console.log('-----');

// 4.
var coincidenciasNombres = verificarCoincidencias(integrante1, integrante2, 'Nombre');

if (confirm('¿Desea comparar apellidos?')) {
    verificarCoincidencias(integrante1, integrante2, 'Apellido');
} else {
    console.log('No se compararán apellidos.');
}
});

function verificarCoincidencias(integrante1, integrante2, tipo) {
var nombres1 = obtenerNombres(integrante1, tipo);
var nombres2 = obtenerNombres(integrante2, tipo);

var coincidencias = nombres1.filter(function (nombre) {
    return nombres2.includes(nombre);
});

if (coincidencias.length > 0) {
    console.log('Hubo coincidencias en', tipo + 's:', coincidencias);

    // Solicitar color para destacar coincidencias
    var color = prompt('Hubo coincidencias en ' + tipo.toLowerCase() + 's. Ingrese un color para destacarlas:');

    // Aplicar estilos a las coincidencias
    aplicarEstilos(integrante1, tipo, coincidencias, color);
    aplicarEstilos(integrante2, tipo, coincidencias, color);
} else {
    console.log('No hubo coincidencias en', tipo + 's.');
}
}

function obtenerNombres(integrante, tipo) {
var nombres = [];
if (tipo === 'Nombre') {
    var primerNombre = integrante.primerNombre.toLowerCase();
    var segundoNombre = integrante.segundoNombre ? integrante.segundoNombre.toLowerCase() : null;
    nombres.push(primerNombre);
    if (segundoNombre) {
        nombres.push(segundoNombre);
    }
} else if (tipo === 'Apellido') {
    var primerApellido = integrante.primerApellido.toLowerCase();
    var segundoApellido = integrante.segundoApellido ? integrante.segundoApellido.toLowerCase() : null;
    nombres.push(primerApellido);
    if (segundoApellido) {
        nombres.push(segundoApellido);
    }
}
return nombres;
}

function aplicarEstilos(integrante, tipo, coincidencias, color) {
var selector = `h2:nth-of-type(${integrante.numero}) + dl`;

coincidencias.forEach(function (coincidencia) {
    var elementos = document.querySelectorAll(`${selector} dd`);

    elementos.forEach(function (elemento) {
        if (elemento.textContent.trim().toLowerCase() === coincidencia.toLowerCase()) {
            elemento.style.color = color;
        }
    });
});
}

function obtenerNombreCompleto(numeroIntegrante) {
var primerNombre = document.querySelector(`h2:nth-of-type(${numeroIntegrante}) + dl dt:first-of-type + dd`).textContent.trim();
var segundoNombre = document.querySelector(`h2:nth-of-type(${numeroIntegrante}) + dl dt:nth-of-type(2) + dd`).textContent.trim();
var primerApellido = document.querySelector(`h2:nth-of-type(${numeroIntegrante}) + dl dt:nth-of-type(3) + dd`).textContent.trim().toUpperCase();
var segundoApellido = document.querySelector(`h2:nth-of-type(${numeroIntegrante}) + dl dt:nth-of-type(4) + dd`).textContent.trim().toUpperCase();

var nombreCompleto = {
    numero: numeroIntegrante,
    primerNombre: primerNombre,
    segundoNombre: segundoNombre,
    primerApellido: primerApellido,
    segundoApellido: segundoApellido
};

return nombreCompleto;
}
