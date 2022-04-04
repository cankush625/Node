const { createReadStream } = require("fs");

const stream = createReadStream("./inbuilt_modules/content/docs/demo.txt");

// ReadStream reads the data in small chunks. By default it reads 64KiB of data.
stream.on("data", (chunk) => {
    console.log(chunk);
});
