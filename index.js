// voy a usar expresiones regulares y require/module.exports**********

//STAT: si el archivo es un directorio o un archivo, usandostats.isFile()ystats.isDirectory()

const fs = require("fs");
const fetch = require("node-fetch");
const ruta = process.argv[2];


// Stat entrega información sobre lo que se esta leyendo
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

// Función que lee el archivo, contenido
const mdArchivo = (archivo) => {
  fs.readFile(archivo, "utf-8", (err, data) => {
    let arrayObjLinks = getLinksFile(data);
    let linkList = [];

    for (let objUrl of arrayObjLinks) {
     // console.log(url);
      linkList.push({
        href: objUrl[2],
        text: objUrl[1],
        file: archivo, // aún esta relativo*********
      });
    }

    console.log(linkList);
    validarLink(linkList);
  });
};


//Función para obtener links del archivo
const getLinksFile = (data) => {
  const expRegular = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; //exp.reg. para encontrar links.
  let arrayObjLinks = data.matchAll(expRegular); //matchAll devuelve todos los links del archivo.;
  return arrayObjLinks;
}


//**Función que valida los link */
const validarLink = (linkList) => {
  for (let link of linkList) {
    fetch(link.href) // fetch ya es una promesa***
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.status);
          link.status = 200;
        }else{
          console.log(response.status);
        }
      })
      .catch(function (err) {
        console.log(err);
        link.status = err.status;
        
      });
  }
};


// Lee un directorio
const mdDirectorio = (directorio) => {
  fs.readdir(directorio, (err, data) => {
    data.forEach((archivo) => {
      if (archivo.includes(".md")) {
        console.log(archivo);
        mdArchivo(archivo)
      }
    });
  });
};

//module.exports = {};
