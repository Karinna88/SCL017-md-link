const { clear } = require("console");
const fs = require("fs");
const fetch = require("node-fetch");
const ruta = process.argv[2];
//const path = require('path');

//funcion mdLinks-principal
const mdLinks = (path, options) => {
  return new Promise((resolve, rejects) => {
    
    fileOrDirectory(path)
      .then((respuestaLink) => {
        // Aqui solo se esta viendo la validación de links
        if (options.validate === true && options.stats === false) {
          validateLink(respuestaLink).then((newRespuesta) => {
            resolve(newRespuesta);
          });
        }

        // Aqui solo se esta viendo estadistica
        if (options.stats === true && options.validate === false) {
          mdEstadisticas(respuestaLink).then((resStats) => {
            resolve(resStats);
          });
        }

        // Aquí se esta validando los links y viendo las estadisticas
        if (options.validate === true && options.stats === true) {
          validateLink(respuestaLink).then((resLinkValidados) => {
            mdEstadisticas(resLinkValidados).then((resEstadistica) => {
              resolve(resEstadistica);
            });
          });
        }
        // por defecto es false / solo retorna los links
        if (options.validate === false && options.stats === false){
          resolve(respuestaLink);
        }
      })
      .catch((err) => {
        rejects(err);
      });
  });
};

// Función para ver si es archivo o directorio
const fileOrDirectory = (path) => {
  return new Promise((resolve, rejects) => {
    fs.stat(ruta, (err, stats) => {
      if (err) {
        rejects(err);
      } else {
        if (stats.isFile()) {
          resolve(mdArchivo(path));
        }
        if (stats.isDirectory()) {
          resolve("es un directorio"); //*Pendiente
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

// Función que valida los link
const validateLink = (linkList) => {
  return new Promise((resolve, rejects) => {
    let arrayPromiseLink = linkList.map((objLink) => {
      // console.log(objLink.href);
      return fetch(objLink.href).then((resPeticion) => {
        if (resPeticion.status === 200) {
          objLink.status = resPeticion.status;
          objLink.ok = "OK";
        } else if (resPeticion.status === 404) {
          objLink.status = resPeticion.status;
          objLink.ok = "FAIL";
        }
      });
    });

    Promise.all(arrayPromiseLink) // son muchas promesas
      .then((res) => {
        resolve(linkList);
      })
      .catch((err) => {
        rejects(err);
      });
  });
};

// Función de estadisticas
const mdEstadisticas = (linkList) => {
  return new Promise((resolve, rejects) => {
    //  console.log(linkList);
    let linkHref = linkList.map((objLink) => objLink.href); // mapea y genera un array solo de href
    let linkBroken = linkList.filter((objLink) => objLink.ok == "FAIL").length;
    let totalUnique = new Set(linkHref).size; //pasando el array y calculando el total de elementos
    let statsResult = {
      total: linkList.length,
      unique: totalUnique,
      broken: linkBroken,
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

module.exports = { mdLinks, fileOrDirectory, mdArchivo, getLinksFile, validateLink, mdEstadisticas }
