const path = require("path");
const { mdLinks } = require("./index.js");
const ruta = process.argv[2];
let options1 = process.argv[3];
let options2 = process.argv[4];

console.log(options1);
console.log(options2);

let options = {
  validate: false,
  stats: false,
};

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

console.log(options);
mdLinks(ruta, options)
  .then((respuesta) => {
    // console.log(respuesta)
  })
  .catch((err) => console.log(err));
