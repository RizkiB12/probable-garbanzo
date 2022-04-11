const http = require("http");
const { PORT = 8000 } = process.env;
const url = require("url");
const fs = require("fs");
const path = require("path");
const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

function onRequest(req, res) {
    res.setHeader("Content-Type", "text/html");
    switch (req.url) {
        case "/" || "":
            req.url = "/index.example.html";
            break;
        case "/cars":
            req.url = "/cars.html";
            break;
        default:
            req.url = req.url;
            break;
    }
    const parseURL = url.parse(req.url);
    const pathName = `${parseURL.pathname}`;
    const extension = path.parse(pathName).ext;
    const absolutePath = path.join(PUBLIC_DIRECTORY, pathName);
    // console.log(pathName, extension);
    // console.log(`absolute`, absolutePath);
    const mapContent = {
        ".css": "text/css",
        ".jpg": "image/jpeg",
        ".html": "text/html",
        ".js": "text/javascript",
        ".svg": "image/svg+xml",
    };

    fs.exists(absolutePath, (exist) => {
        if (!exist) {
            res.writeHead(404);
            res.end("FILE NOT FOUND");
            return;
        }
    });

    fs.readFile(absolutePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end("FILE NOT FOUND");
            // console.log(err);
        } else {
            res.setHeader("Content-Type", mapContent[extension] || "text/plain");
            res.end(data);
        }
    });
}

const server = http.createServer(onRequest);

server.listen(PORT, "localhost", () => {
    console.log("Server sudah berjalan, silahkan buka http://localhost:%d", PORT);
});