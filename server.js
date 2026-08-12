const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "packet.json");

const server = http.createServer((req, res) => {

    // Open the registration page
    if (req.method === "GET" && req.url === "/") {
        fs.readFile(path.join(__dirname, "index.html"), (err, data) => {

            if (err) {
                res.writeHead(500);
                res.end("Error loading page");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }


    // Serve script.js
if (req.method === "GET" && req.url === "/script.js") {
    fs.readFile(path.join(__dirname, "script.js"), (err, data) => {

        if (err) {
            res.writeHead(404);
            res.end("script.js not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "application/javascript"
        });

        res.end(data);
    });

    return;
}

// Serve style.css
if (req.method === "GET" && req.url === "/style.css") {
    fs.readFile(path.join(__dirname, "style.css"), (err, data) => {

        if (err) {
            res.writeHead(404);
            res.end("style.css not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/css"
        });

        res.end(data);
    });

    return;
}
    // Save registration data
    if (req.method === "POST" && req.url === "/register") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            try {
                const newStudent = JSON.parse(body);

                // Read existing JSON
                const data = JSON.parse(
                    fs.readFileSync(DATA_FILE, "utf8")
                );

                // Add new student
                data.students.push(newStudent);

                // Save updated JSON
                fs.writeFileSync(
                    DATA_FILE,
                    JSON.stringify(data, null, 2)
                );

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: true,
                    message: "Registration saved successfully"
                }));

            } catch (error) {

                console.error(error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: "Failed to save registration"
                }));
            }
        });

        return;
    }

    res.writeHead(404);
    res.end("Not Found");
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});