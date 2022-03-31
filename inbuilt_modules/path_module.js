const path = require("path");

// Get platform specific separator
console.log(path.sep);

// Generate file path
const filePath = path.join("content", "docs", "demo.txt");
console.log(filePath);

// Generate absolute path to the file
const absolutePath = path.resolve(__dirname, "content", "docs", "demo.txt");
console.log(absolutePath);
