const express = require('express');
const path = require('path');
require('./config/db.config');

const cookieparser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const { setFlash } = require('./middleware/connectFlash.middleware');

require('./middleware/passport.local.middleware');

const app = express();

const PORT = 9000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieparser());

app.use(session({
    name: "AdminSession",
    secret: "bhagi@123",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.currentAdmin);
app.use(setFlash);

app.use('/', require('./routes/'));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not started...", err);
        return;
    }
    console.log("Server is started on port", PORT);
});