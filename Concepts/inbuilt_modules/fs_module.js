// Synchronous FS

// Destructure the methods / Import only the methods that are required
const { readFileSync, writeFileSync } = require("fs");

// Read the file
const demo = readFileSync("./inbuilt_modules/content/docs/demo.txt", "utf-8");
console.log(demo);

// Write to the file
writeFileSync(
    "./inbuilt_modules/content/docs/write.txt",
    `Demo write text: ${demo}`,
);

// Append the data to the file
writeFileSync(
    "./inbuilt_modules/content/docs/write.txt",
    `Demo write text: ${demo}`,
    { flag: "a" },
);

// Async FS
// This is an example of event loop

const { readFile, writeFile } = require("fs");

readFile("./inbuilt_modules/content/docs/write.txt", "utf-8", (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});

writeFile(
    "./inbuilt_modules/content/docs/write-async.txt",
    `Async write to the file ${demo}`,
    (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        // This will print undefined because we don't expect anything to return
        console.log(result);
    },
);
