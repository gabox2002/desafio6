//1.
document.addEventListener("DOMContentLoaded", function () {
    const titleText = document.title;
    console.log(titleText);
});

//3.
document.addEventListener("DOMContentLoaded", function () {
    const integrante1 = obtenerNombreCompleto("integrante1");
    const integrante2 = obtenerNombreCompleto("integrante2");

    console.log(`-----\nIntegrante 1: "${integrante1}"\nIntegrante 2: "${integrante2}"\n-----`);
});

function obtenerNombreCompleto(dlId) {
    const dl = document.getElementById(dlId);
    const nombres = Array.from(dl.getElementsByTagName("dd")).map(el => el.textContent).filter(Boolean);
    return nombres.join(" ").toUpperCase();
}

//4.
document.addEventListener("DOMContentLoaded", function () {
    const integrante1 = obtenerNombreCompleto("integrante1");
    const integrante2 = obtenerNombreCompleto("integrante2");

    console.log(`-----\nIntegrante 1: "${integrante1}"\nIntegrante 2: "${integrante2}"\n-----`);

    const coincidencias = verificarCoincidencias(integrante1, integrante2);

    if (coincidencias) {
        const color = prompt("Hubo coincidencias. Ingresa un color para destacar los nombres:");

        resaltarCoincidencias("integrante1", color);
        resaltarCoincidencias("integrante2", color);
    } else {
        console.log("No hubo coincidencias.");
    }
});

function verificarCoincidencias(nombre1, nombre2) {
    return nombre1.toLowerCase() !== nombre2.toLowerCase();
}

function resaltarCoincidencias(dlId, color) {
    const dl = document.getElementById(dlId);
    const ddElements = dl.getElementsByTagName("dd");

    for (const dd of ddElements) {
        if (dd.textContent.toLowerCase() === nombreCoincidente.toLowerCase()) {
            dd.style.color = color;
        }
    }
}

//5
document.addEventListener("DOMContentLoaded", function () {
    const integrante1 = obtenerNombreCompleto("integrante1");
    const integrante2 = obtenerNombreCompleto("integrante2");

    console.log(`-----\nIntegrante 1: "${integrante1}"\nIntegrante 2: "${integrante2}"\n-----`);

    const coincidencias = verificarCoincidencias(integrante1, integrante2);

    if (coincidencias) {
        const color = prompt("Hubo coincidencias. Ingresa un color para destacar los nombres:");

        resaltarCoincidencias("integrante1", color);
        resaltarCoincidencias("integrante2", color);
    } else {
        console.log("No hubo coincidencias.");
    }
});

function obtenerNombreCompleto(dlId) {
    const dl = document.getElementById(dlId);
    const nombres = Array.from(dl.getElementsByTagName("dd")).map(el => el.textContent).filter(Boolean);
    return nombres.join(" ").toUpperCase();
}

function verificarCoincidencias(nombre1, nombre2) {
    return nombre1.toLowerCase() !== nombre2.toLowerCase();
}

function resaltarCoincidencias(dlId, color) {
    const dl = document.getElementById(dlId);
    const ddElements = dl.getElementsByTagName("dd");

    for (const dd of ddElements) {
        if (dd.textContent.toLowerCase() === nombreCoincidente.toLowerCase()) {
            dd.style.color = color;
        }
    }
}