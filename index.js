const { rejects } = require("assert");
const fs = require("fs");
const fetch = require("node-fetch");
const ruta = process.argv[2];
// const path = require('path');

//funcion mdLinks-principal*********
const mdLinks = (path, options) => {
  return new Promise((resolve, rejects) => {
    //
    fileOrDirectory(path)
      .then((respuestaLink) => {
        if (options.validate === true) {
          validateLink(respuestaLink).then((newRespuesta) => {
            resolve(newRespuesta);
          });
        } 

        if (options.stats === true) {
          stats(respuestaLink).then((resStats) => {
            resolve(resStats);
          });
        }
      })
      .catch((err) => {
        rejects(err);
      });
  });
};

// función para ver si es archivo o directorio*****
const fileOrDirectory = (path) => {
  return new Promise((resolve, rejects) => {
    fs.stat(ruta, (err, stats) => {
      if (err) {
        rejects(err);
      } else {
        if (stats.isFile()) {
          //aqui se leera un archivo
          resolve(mdArchivo(path));
          // mdArchivo(ruta);
        }
        if (stats.isDirectory()) {
          resolve("es un directorio");
          // mdDirectorio(ruta);
        }
      }
    });
  });
};

//Función que lee el archivo
const mdArchivo = (archivo) => {
  return new Promise((resolve, rejects) => {
    fs.readFile(archivo, "utf-8", (err, data) => {
      if (err) {
        rejects(err);
      } else {
        // resolve(data)
        let arrayObjLinks = getLinksFile(data); // esto me devuelve un array de links

        let linkList = [];
        for (let objURL of arrayObjLinks) {
          linkList.push({
            href: objURL[2],
            text: objURL[1],
            file: archivo,
          });
        }
        resolve(linkList);
      }
    });
  });
};

//Función para obtener links del archivo
const getLinksFile = (data) => {
  const expRegular = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; //exp.reg. para encontrar links.
  let arrayObjLinks = data.matchAll(expRegular); //matchAll devuelve todos los links del archivo.;
  return arrayObjLinks;
};

// //**Función que valida los link */

const validateLink = (linkList) => {
  return new Promise((resolve, rejects) => {
    let arrayPromiseLink = linkList.map((objLink) => {
      // console.log(objLink.href);
      return fetch(objLink.href).then((resPeticion) => {
        if (resPeticion.status === 200) {
          objLink.status = resPeticion.status;
          objLink.response = "OK";
        } else if (resPeticion.status === 404) {
          objLink.status = resPeticion.status;
          objLink.response = resPeticion.statusText;
          objLink.response = "FAIL";
        }
      });
    });

    Promise.all(arrayPromiseLink) // son muchas primesas
      .then((res) => {
        resolve(linkList);
      })
      .catch((err) => {
        rejects(err);
      });
  });
};

// Función stats****

const stats = (linkList) => {
  return new Promise((resolve, rejects) => {
    let statsResult = {
      total: 2,
      unique: 2,
    };

    resolve(statsResult);
  });
};

// // Lee un directorio
// const mdDirectorio = (directorio) => {
//   fs.readdir(directorio, (err, data) => {
//     data.forEach((archivo) => {
//       if (archivo.includes(".md")) {
//         console.log(archivo);
//         mdArchivo(archivo)
//       }
//     });
//   });
// };

module.exports = { mdLinks };
