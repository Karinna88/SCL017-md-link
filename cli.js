const path = require('path');
const {mdLinks} = require('./index.js');
const ruta = process.argv[2];

let options = {
    validate:false,
    stats:false
};

mdLinks(ruta, options)
.then(respuesta => {
    console.log(respuesta)
})
.catch(err => console.log(err));