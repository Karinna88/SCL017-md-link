// const promise = new Promise ((resolve, reject) => {
//     const number = Math.floor(Math.random() * 10);
// console.log(number);
//     setTimeout(
//         () => number > 5
//         ? resolve (number)
//         : reject(new Error ('Menor a 5')),
//         4000
//     );
// });

// promise
// .then(number => console.log(number))
// .catch(error => console.error(error));

//*********************************************

const fs = require("fs");
const { resolve } = require("path");

// function readFile(path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, "utf8", (error, data) => {
//       if (error) {
//         return reject(error);
//       } else {
//         return resolve(data);
//       }
//     });
//   });
// }

// readFile("READMEXXDEAR.md")
// .then (data => console.log(data))
// .catch(error => console.log(error));

// *******************************************

// promesas en paralelo Promise.all recibe una lista de promesas si una es rechazada todas lo son...

const path = require("path");
console.log("=> "+ path.resolve('./images'))
 console.log("=> "+ path.resolve('./images').replace(/\\/g, '/'))

// console.log("=>"+ path.extname('README.md',));

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
}

// Promise.all([readFile('readmePruebas/readme1.md'), readFile('readmePruebas/readme2.md'), readFile('readmePruebas/readme3.md')])
// 	.then(data => {
//     // console.log(data)
//     //  data.map(data => {
//     //       console.log(path.resolve(data));
//     //  })
//   })
// 	.catch(error => console.error(error));

// Promise.all([
//   readFile("readmePruebas/readme1.md"),
//   readFile("readmePruebas/readme3.md"),
// ]).then((data) => {
//   console.log(data);
//   data.map((data) => {
//      console.log(data);
    
//    // console.log('--' + path.resolve('gggggg'))
//   });
// });
