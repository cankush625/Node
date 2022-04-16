const { readFile, writeFile } = require("fs").promises;

const getData = async (path) => {
    try {
        const demo = await readFile(path, "utf-8");
        console.log(demo);
        await writeFile(path, "Data from write file promise", {flag: "a"});
    } catch (err) {
        console.log(err);
    }
};

getData("./inbuilt_modules/content/docs/write.txt");
