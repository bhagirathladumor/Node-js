const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(204);
    return res.end();
  }

  const msg = `New User ${new Date().toLocaleString()} | IP := ${
    req.socket.remoteAddress
  }\n`;

  fs.appendFile("userLog.txt", msg, (err) => {
    if (err) console.log("Logging error:", err);
  });

  console.log("Request:", req.url);

  let fileName = "";

  switch (req.url) {
    case "/":
      fileName = "index.html";
      break;

    case "/contact":
      fileName = "contact.html";
      break;

    case "/about":
      fileName = "about.html";
      break;

    default:
      fileName = "404.html";
      break;
  }

  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.log("File Error:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Internal Server Error");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(8000, (err) => {
  if (err) {
    console.log("Server failed to start:", err);
    return;
  }
  console.log("Server started 8000");
});
