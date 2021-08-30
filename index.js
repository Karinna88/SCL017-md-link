// voy a usar expresiones regulares y require/module.exports**********

//STAT: si el archivo es un directorio o un archivo, usandostats.isFile()ystats.isDirectory()

const fs = require("fs");
const fetch = require('node-fetch');
const ruta = process.argv[2];

fs.stat(ruta, (err, stats) => {
  if (err) {
    console.log(err);
  } else {
    if (stats.isFile()) {
      //aqui se leera un archivo
      mdArchivo(ruta);
    }
    if (stats.isDirectory()) {
      mdDirectorio(ruta);
    }
  }
});

const mdArchivo = (archivo) => {
  fs.readFile(archivo, "utf-8", (err, data) => {
    const expRegular = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; //exp.reg. para encontrar links
    let iterador = data.matchAll(expRegular);
    let linkList = [];

    for (let url of iterador) {
      linkList.push({ 
        href: url[2],
        text: url[1],
        file: archivo, // aún esta relativo*********
      });
    }

    //esto debe ir en un promesa

    for (let link of linkList){
           fetch(link.href)
           .then(function(response) {
             if (response.status === 200){
                 console.log('ok');
                 link.status = 200;

             }  
           })
           .catch(function(err){
             link.status = err.status;
           })
    }



    console.log(linkList);
  });
};

const mdDirectorio = (directorio) => {
  fs.readdir(directorio, (err, data) => {
    data.forEach((archivo) => {
      if (archivo.includes(".md")) {
        console.log(archivo);
      }
    });
  });
};




//module.exports = {};
