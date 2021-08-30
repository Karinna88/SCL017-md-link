
// voy a usar expresiones regulares y require/module.exports**********

//STAT: si el archivo es un directorio o un archivo, usandostats.isFile()ystats.isDirectory()

const fs = require('fs');
const ruta = process.argv[2];

fs.stat(ruta,(err, stats) => {
    if(err) {
        console.log(err);
    }
else{
    if(stats.isFile()){ //aqui se leera un archivo
        mdArchivo(ruta);
    }
   if(stats.isDirectory()){
        mdDirectorio(ruta);
   }
}
})

const mdArchivo = (archivo)=>{
   fs.readFile(archivo,"utf-8", (err, data) => {

    let expRegular = /\d/ig;
    console.log(expRegular.test(data));

   })
}

const mdDirectorio = (directorio)=>{
    fs.readdir(directorio, (err, data) =>{
   
        data.forEach((archivo) =>{
            if (archivo.includes(".md")) {
                console.log(archivo);
            }
        })
    })
}















//module.exports = {};