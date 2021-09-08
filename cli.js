#!/usr/bin/env node

const { mdLinks } = require("./index.js");
const ruta = process.argv[2];
let options1 = process.argv[3];
let options2 = process.argv[4];


let options = {
  validate: false,
  stats: false,
};

// Se analizan los parametros que ingresa el ususrio
if (
  (options1 === "--validate" && options2 === "--stats") ||
  (options1 === "--stats" && options2 === "--validate")
) {
  options.validate = true;
  options.stats = true;
} else if (options1 === "--validate") {
  options.validate = true;
  options.stats = false;
} else if (options1 === "--stats") {
  options.validate = false;
  options.stats = true;
} else {
  options.validate = false;
  options.stats = false;
}


mdLinks(ruta, options)
  .then((respuesta) => {
     console.log(respuesta)
  })
  .catch((err) => console.log(err));
