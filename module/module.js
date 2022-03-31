// In CommonJS every file is a module by default
// Modules - Encapsulated Code (only share minimum)

const names = require('./export_many');
const greet = require('./export_one');

console.log(names);
console.log(greet);

greet(names.ankush);

const bob = require('./alternate_export_syntax');

console.log("Name: ", bob.bob);
console.log("Experience: ", bob.bobsExperience);
