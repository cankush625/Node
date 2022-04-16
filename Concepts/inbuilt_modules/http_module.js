const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Welcome to NodeJS");
        res.end();
        return;
    }
    res.end(`<h1>Page not found!</h1>`);
});

server.listen(5000);
