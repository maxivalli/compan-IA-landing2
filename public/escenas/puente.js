// Puente entre las escenas del taller y la landing.
//
// `comun.js` y `mate.js` son COPIAS EXACTAS de AbuApp/taller-animaciones/. No se
// tocan: el taller es la fuente de verdad de lo que dibuja la app, y editar la
// copia haría que la web muestre algo que la app no dibuja — que es justo el
// problema que esto viene a arreglar.
//
// Se cargan como scripts clásicos, y sus `const` de nivel superior quedan en el
// ámbito del script: son visibles entre ellos pero NO cuelgan de `window`. Este
// archivo, que también es clásico, las ve y las expone para el módulo de React.
window.__ESCENAS = ANIMACIONES;
