const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let newtask = [
  
];

app.get("/", (req, res) => {
  res.render("home", {
    task: newtask,
  });
});

app.get("/newTask", (req, res) => {
  res.render("form");
});

app.post("/addTask", (req, res) => {
  const task = req.body;
  task.id = Math.floor(Math.random() * 1000);
  newtask.push(task);
  res.render("home", {
    task: newtask,
  });
});

app.post("/updateTask", (req, res) => {
  newtask = newtask.map((task) => {
    if (task.id == req.body.id) {
      return req.body;
    } else {
      return task;
    }
  });

  res.redirect("/");
});

app.get("/editTask", (req, res) => {
  const task = newtask.find((task) => task.id == req.query.id);
  if (!task) {
    return res.redirect("/");
  }
  res.render("editForm", { task });
});

app.get("/deleteTask", (req, res) => {
  newtask = newtask.filter((task) => task.id != req.query.id);
  res.redirect("/");
});

app.get("/status", (req, res) => {});

app.listen(9000, (err) => {
  if (err) {
    console.log(`server is not started`);
    return false;
  }
  console.log("server is started");
});
