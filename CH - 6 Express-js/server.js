const express = require('express');
const app = express();
const port = 8000;

app.get("/", (req, res) => {
    res.end("This Is Home Pages...");
});
app.get("/about", (req, res) => {
    res.end("This Is about Pages...");
});
app.get("/contact", (req, res) => {
    res.end("This Is Contact Pages...");
});


app.listen(port, (err) => {
    if (err) {
        console.log("there is Error : ", err);
        return;
    }

    console.log(`Server Are Connected.... in (http://localhost:8000) `);
})
