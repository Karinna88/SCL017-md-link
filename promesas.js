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

//*********************************************/

const fs = require("fs");

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
}

readFile("READMEXXDEAR.md")
.then (data => console.log(data))
.catch(error => console.log(error));