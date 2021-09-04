


const fs = require("fs");
const fetch = require("node-fetch");

const ruta = process.argv[2];
// const path = require('path');



//funcion mdLinks-principal*********
const mdLinks = (path, options) => {
  return new Promise((resolve, rejects) =>{
    // 
    fileOrDirectory(path)
    .then(respuesta =>{
      resolve(respuesta);
    })
    .catch(err => {
      rejects(err);
    })
  })
}

// función para ver si es archivo o directorio*****
const fileOrDirectory = (path) =>{
  return new Promise ((resolve, rejects) => {
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
            resolve('es un directorio');
            // mdDirectorio(ruta);
          }
        }
      });
  })
}


//Función que lee el archivo
const mdArchivo = (archivo) => {
  return new Promise((resolve, rejects) =>{

    fs.readFile(archivo, "utf-8", (err, data) => {
      if(err){
        rejects(err)
      }else {
        // resolve(data)
       let arrayObjLinks = getLinksFile(data)// esto me devuelve un array de links
       
       let linkList = [];
       for (let objURL of arrayObjLinks){
         linkList.push({
           href: objURL[2],
           text: objURL[1],
           file: archivo
         })
       }
       resolve(linkList)
      }
    });
  })
};



//Función para obtener links del archivo
const getLinksFile = (data) => {
  const expRegular = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; //exp.reg. para encontrar links.
  let arrayObjLinks = data.matchAll(expRegular); //matchAll devuelve todos los links del archivo.;
  return arrayObjLinks;
}












// //**Función que valida los link */
// const validarLink = (linkList) => {
//   for (let link of linkList) {
//     fetch(link.href) // fetch ya es una promesa***
//       .then(function (response) {
//         if (response.status === 200) {
//           console.log(response.status);
//           link.status = 200;
//         }else{
//           console.log(response.status);
//         }
//       })
//       .catch(function (err) {
//         console.log(err);
//         link.status = err.status;
        
//       });
//   }
// };


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

module.exports = {mdLinks};
