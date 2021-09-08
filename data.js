const links = [
{
    href:'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'readme1.md'
},
{
    href:'https://nodejs.org/',
    text: 'Node.js',
    file: 'readme1.md'
},
{ 
    href:'https://run.mocky.io/v3/591ac1ab-b487-40f4-812c-0e5d6f332728',
    text: 'Link malo',
    file: 'readme1.md'

}
]


const pathTest = "readmePruebas/readme1.md";

const options = {
    validate: false,
    stats: false
    };

module.exports = { links, pathTest,  options };  