// 1. Leer el titulo
const titleText = document.title;
console.log(titleText);

// 3. Leer datos y mostrar en consola
document.addEventListener("DOMContentLoaded", function () {
    console.log(`-----`);
    for (let i = 1; i <= 2; i++) {
        const integrante = obtenerNombreCompleto(i);
        console.log(`Integrante ${i}: "${integrante.primerNombre} ${ integrante.segundoNombre ? integrante.segundoNombre.concat(" ") : "" }${integrante.primerApellido} ${integrante.segundoApellido}"`);
    }
    console.log("-----");

    // 4. Comparar nombres y apellidos
    const integrante1 = obtenerNombreCompleto(1);
    const integrante2 = obtenerNombreCompleto(2);

    const coincidenciasNombres = verificarCoincidencias( integrante1, integrante2, "Nombre");

    if (confirm("¿Desea comparar apellidos?")) {
        verificarCoincidencias(integrante1, integrante2, "Apellido");
    } else {
        console.log("No se compararán apellidos.");
    }
});

function verificarCoincidencias(integrante1, integrante2, tipo) {
    const nombres1 = obtenerNombres(integrante1, tipo);
    const nombres2 = obtenerNombres(integrante2, tipo);

    const coincidencias = encontrarCoincidencias(nombres1, nombres2);

    if (coincidencias.length > 0) {
        console.log(`Hubo coincidencias en ${tipo}s:`, coincidencias);

        // Verificar coincidencias en nombres y apellidos
        const coincidenciasNombres = encontrarCoincidencias(
            obtenerNombres(integrante1, "Nombre"),
            obtenerNombres(integrante2, "Nombre")
        );
        const coincidenciasApellidos = encontrarCoincidencias(
            obtenerNombres(integrante1, "Apellido"),
            obtenerNombres(integrante2, "Apellido")
        );

        if ( coincidenciasNombres.length > 0 && coincidenciasApellidos.length > 0) {
            // Solicitar color para destacar coincidencias
            const color = prompt(
                `Hubo coincidencias en ${tipo.toLowerCase()}s. Ingrese un color para destacarlas:`
            );

            // Aplicar estilos a las coincidencias
            aplicarEstilos(integrante1, tipo, coincidencias, color);
            aplicarEstilos(integrante2, tipo, coincidencias, color);
        } 
    } else {
        console.log(`No hubo coincidencias en ${tipo}s.`);
    }
}

function encontrarCoincidencias(array1, array2) {
    const coincidencias = [];

    for (let i = 0; i < array1.length; i++) {
        const valor = array1[i];

        // Verificar si el valor está presente en array2
        for (let j = 0; j < array2.length; j++) {
            if (valor === array2[j]) {
                coincidencias[coincidencias.length] = valor;
                break;  // Salir del bucle interno una vez que se encuentra la coincidencia
            }
        }
    }

    return coincidencias;
}

function obtenerNombres(integrante, tipo) {
    let nombres = [];
    if (tipo === "Nombre") {
        const primerNombre = integrante.primerNombre.toLowerCase();
        const segundoNombre = integrante.segundoNombre ? integrante.segundoNombre.toLowerCase(): null;
        
        nombres = nombres.concat(primerNombre);
        if (segundoNombre) {
            nombres = nombres.concat(segundoNombre);
        }
    } else if (tipo === "Apellido") {
        const primerApellido = integrante.primerApellido.toLowerCase();
        const segundoApellido = integrante.segundoApellido ? integrante.segundoApellido.toLowerCase(): null; 
        
        nombres = nombres.concat(primerApellido);
        
        if (segundoApellido) {
            nombres = nombres.concat(segundoApellido);
        }
    }
    return nombres;
}

function aplicarEstilos(integrante, tipo, coincidencias, color) {
    const selector = document.querySelectorAll(`.integrante${numeroIntegrante}`);

    for (let i = 0; i < coincidencias.length; i++) {
        const coincidencia = coincidencias[i];
        const elementos = document.querySelectorAll(`${selector} dd`);

        for (let j = 0; j < elementos.length; j++) {
            const elemento = elementos[j];

            if (elemento.innerHTML.trim().toLowerCase() === coincidencia.toLowerCase()) {
                elemento.style.color = color;
            }
        }
    }
}

function obtenerNombreCompleto(numeroIntegrante) {
    const integrantes = document.querySelectorAll(`.integrante${numeroIntegrante}`);

    let nombreCompleto = {
        numero: numeroIntegrante,
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
    };

    for (let i = 0; i < integrantes.length; i++) {
        const dataElement = integrantes[i].children;

        for (let index = 0; index < dataElement.length; index++) {
            const dtElement = dataElement[index];

            if (dtElement.tagName === "DT") {
                const dataType = dtElement.innerText.trim().toLowerCase();
                const ddElement = dataElement[index + 1]; // Obtener el siguiente elemento directamente

                switch (dataType) {
                    case "primer nombre":
                        nombreCompleto.primerNombre = ddElement.innerText.trim();
                        break;
                    case "segundo nombre":
                        nombreCompleto.segundoNombre = ddElement.innerText.trim();
                        break;
                    case "primer apellido":
                        nombreCompleto.primerApellido = ddElement.innerText.trim().toUpperCase();
                        break;
                    case "segundo apellido":
                        nombreCompleto.segundoApellido = ddElement.innerText.trim().toUpperCase();
                        break;
                }
            }
        }
    }

    return nombreCompleto;
}
