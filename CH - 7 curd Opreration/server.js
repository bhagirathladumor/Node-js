let express = require("express");
let PORT = 9000;

let app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let allUsers = [
  {
    Id: "101",
    Name: "Shubman Gill",
    Email: "gill.shubman@gmail.com",
    Password: "Gill@123",
    Phone: 9876543211,
    Address: "Fazilka, Punjab",
    Age: "25",
  },
  {
    Id: "102",
    Name: "Virat Kohli",
    Email: "viratkohli@gmail.com",
    Password: "Kohli@123",
    Phone: 9988776655,
    Address: "Delhi, India",
    Age: "36",
  },
  {
    Id: "103",
    Name: "Rohit Sharma",
    Email: "rohitsharma@gmail.com",
    Password: "Rohit@123",
    Phone: 9876501234,
    Address: "Mumbai, Maharashtra",
    Age: "37",
  },
  {
    Id: "104",
    Name: "KL Rahul",
    Email: "klrahul@gmail.com",
    Password: "Rahul@123",
    Phone: 9898989898,
    Address: "Mangalore, Karnataka",
    Age: "32",
  },
];
let id = 105;
app.post("/insertUser", (req, res) => {
  const user = req.body;
  console.log(user);
  user.Id = id;
  id++;
  console.log(user);
  allUsers.push(user);
  res.redirect("/");
});

app.post("/updateUser", (req, res) => {
  allUsers = allUsers.map((user) => {
    if (user.Id == req.body.Id) {
      return req.body;
    } else {
      return user;
    }
  });

  return res.redirect("/");
});

app.get("/editUser", (req, res) => {
  const user = allUsers.find((user) => user.Id == req.query.id);
  if (!user) {
    return res.redirect("/");
  }
  res.render("updateForm", { user });
});

app.get("/", (req, res) => {
  res.render("home", {
    allUsers,
    name: "bhagirath ladumor",
  });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/deleteUser", (req, res) => {
  console.log(req.query.id);

  allUsers = allUsers.filter((user) => user.Id != req.query.id);
  console.log(allUsers);

  res.redirect("/");
});

app.get("/homePage", (req, res) => {
  res.render("home", {
    allUsers,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Server is not started:= ${err}`);
    return false;
  }
  console.log("Server is started!");
});
