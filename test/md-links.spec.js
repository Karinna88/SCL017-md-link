const {mdLinks,mdArchivo, getLinksFile, validateLink} = require('../index.js');
const { links, pathTest, options } = require("../data");

//lee archivo
describe('mdArchivo', () => {
  it('should be a function', () => {
    expect(typeof mdArchivo).toBe('function');
  });
});

//
describe('getLinksFile', () => {
  it('should be a function', () => {
    expect(typeof getLinksFile).toBe('function');
  });
});

//
describe('validateLink', () => {
  it('should be a function', () => {
    expect(typeof validateLink).toBe('function');
  });
});

// test de data

// describe('Test mdLinks2()', () => {
//   it('shoul return something2', () => {
//     // expect.assertions(1);
//     console.log("==>"+pathTest)
//      return mdLinks(pathTest, options).then(res => {
//          console.log("==="+res);
//     // //  expect(res).toEqual(links);
//    })
//   })
//   // it('Deberia retornar un error', () => {
//   //   expect.assertions(1);

//   //   return mdLinks()
//   // })
// })