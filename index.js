
//***PRACTICA CON EL TUTORIAL */

// var giveMeAJoke = require('give-me-a-joke');
// giveMeAJoke.getRandomDadJoke (function(joke) {
//   console.log(joke);
// });

// // module.exports = () => {
// //   // ...
// // };
// const fs = require("fs");
// const ruta = process.argv[2];

// //este lee un directorio
// fs.readdir(ruta, (err, archivos) => {
//   // console.log(archivos);
//   archivos.forEach((archivo) => {
//     if (archivo.includes(".md")) {
//       //este lee un archivo .md
//       fs.readFile(archivo, "utf-8", (err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('leyendo archivo:' + archivo)
//           const lines = data.split(/\r?\n/, 2);
//           lines.forEach((line) => {S
//             console.log("texto", line);
//           });
//         }
//       });
//     }
//   });
// });


// voy a usar expresiones regulares y require/module.exports**********

// EL VALOR DE RETORNO DEBE SER UNA PROMESA NO ARRAY (new Promese())

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

let totalLinks = 0;
let uniqueLinks = 0;
let brokenLinks = 0;














module.exports = {};