const fs = require("fs");

dato = fs.readFileSync("./package.json", "utf-8");

console.log(dato.length);

