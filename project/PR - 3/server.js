const express = require("express");

const app = express();

const PORT = 9000;

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/css", express.static(__dirname + "/css"));

let usersData = [
  [
    {
      id: 101,
      name: "dhruv",
      profileName: "dhruv5270",
      email: "dhruv@gmail.com",
      password: "d@1234",
    },
    {
      id: 120,
      name: "Bhagirath",
      profileName: "bhagirath@",
      email: "bhagirath@gmail.com",
      password: "ladumor9904",
    },
    {
      id: 130,
      name: "Vishal",
      profileName: "vishal@1234",
      email: "vishal@gmail.com",
      password: "vishal7096",
    },
  ],
];

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/addUser", (req, res) => {
  let user = req.body;

  let id = Math.floor(Math.random() * 999);
  user.id = id;

  usersData.push(user);

  res.render("userData", {
    usersData,
  });
});

app.post("/loginUser", (req, res) => {
  let { email, password } = req.body;

  let user = usersData.find(
    (user) => user.email == email && user.password == password
  );

  if (!user) {
    return res.redirect("/registerPage");
  }

  res.render("userData", { usersData });
});

app.get("/registerPage", (req, res) => {
  res.render("registerPage");
});

app.get("/backUser", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, (e) => {
  if (e) {
    console.log("Server is not started...!", e);
    return;
  }
  console.log("Server is Started...!");
});
