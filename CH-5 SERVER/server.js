const http = require("http");

// Create Server

const server = http.createServer((req, res) => {
  res.write("<h1>welcome my project</h1>");
  res.end();
});

// Start Server
server.listen(9000, (error) => {
  if (error) {
    console.error("Server error:", error);
    return false;
  }
  console.log("Server is running");
});
