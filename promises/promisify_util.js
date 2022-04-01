const { readFile, writeFile } = require("fs");
const util = require("util");

const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

const getData = async (path) => {
    try {
        const demo = await readFilePromise(path, "utf-8");
        console.log(demo);
        await writeFilePromise(path, "Data from write file promise", {flag: "a"});
    } catch (err) {
        console.log(err);
    }
};

getData("./inbuilt_modules/content/docs/write.txt");
