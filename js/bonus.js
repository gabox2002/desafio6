document.addEventListener("DOMContentLoaded", function () {
    // Leer datos y mostrar en consola
    console.log("-----");
    mostrarNombreCompleto(1);
    mostrarNombreCompleto(2);
    console.log("-----");
  
    // Comparar nombres y apellidos
    const compararApellidos = confirm("¿Desea comparar los apellidos?");
    if (compararApellidos) {
      compararNombres('apellido');
    } else {
      console.log("No se compararán apellidos.");
    }
  });
  
  function mostrarNombreCompleto(numeroIntegrante) {
    const integrante = obtenerIntegrante(numeroIntegrante);
    const nombreCompleto = construirNombreCompleto(integrante);
    console.log(`Integrante ${numeroIntegrante}: "${nombreCompleto}"`);
  }
  
  function compararNombres(tipo) {
    const nombreCompleto1 = obtenerNombreCompleto(1, tipo);
    const nombreCompleto2 = obtenerNombreCompleto(2, tipo);
  
    const nombres1 = nombreCompleto1.split(" ").filter(Boolean);
    const nombres2 = nombreCompleto2.split(" ").filter(Boolean);
  
    const coincidencias = nombres1.filter(nombre => nombres2.includes(nombre));
  
    if (coincidencias.length > 0) {
      console.log("Hubo coincidencias.");
  
      const color = prompt("Ingrese un color para destacar los nombres coincidentes:");
      aplicarEstilos(coincidencias, color);
    } else {
      console.log("No hubo coincidencias.");
    }
  }
  
  function aplicarEstilos(coincidencias, color) {
    coincidencias.forEach(nombre => {
      const elementos = document.querySelectorAll(`[data-nombre*="${nombre}"]`);
      elementos.forEach(elemento => {
        elemento.style.color = color;
      });
    });
  }
  
  function obtenerNombreCompleto(numeroIntegrante, tipo) {
    const integrante = obtenerIntegrante(numeroIntegrante);
    if (tipo === 'apellido') {
      return `${integrante.primerApellido}${integrante.segundoApellido ? " " + integrante.segundoApellido : ""}`;
    }
    return construirNombreCompleto(integrante);
  }
  
  function completarIntegrante(numeroIntegrante) {
    const integrante = obtenerIntegrante(numeroIntegrante);
  
    if (integrante.primerNombre && integrante.primerApellido) {
      console.log(`Integrante ${numeroIntegrante}: "${construirNombreCompleto(integrante)}"`);
      compararNombres();
    } else {
      console.error('Por favor, complete al menos el primer nombre y el primer apellido.');
    }
  }
  function obtenerIntegrante(numeroIntegrante) {
    return {
      primerNombre: obtenerValor(`primerNombre${numeroIntegrante}`),
      segundoNombre: obtenerValor(`segundoNombre${numeroIntegrante}`),
      primerApellido: obtenerValor(`primerApellido${numeroIntegrante}`).toUpperCase(),
      segundoApellido: obtenerValor(`segundoApellido${numeroIntegrante}`).toUpperCase(),
    };
  }
  
  function construirNombreCompleto(integrante) {
    return `${integrante.primerNombre ? integrante.primerNombre + " " : ""}${integrante.segundoNombre ? integrante.segundoNombre + " " : ""}${integrante.primerApellido}${integrante.segundoApellido ? " " + integrante.segundoApellido : ""}`;
  }
  
  function obtenerValor(id) {
    return document.getElementById(id).value.trim();
  }
  