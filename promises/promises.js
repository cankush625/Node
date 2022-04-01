const { readFile } = require("fs");

const getData = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, "utf-8", (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

// Resolve promises with chaining
getData("./inbuilt_modules/content/docs/demo.txt")
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

// Resolve promises with async-await
const retrieveData = async (path) => {
    try {
        const data = await getData(path);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

retrieveData("./inbuilt_modules/content/docs/write.txt");
