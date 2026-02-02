const express = require('express');
const Cookie = require('cookie-parser');
const path = require('path');
require('./config/db.config')
const app = express();
const port = 9000;

app.use(Cookie());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/', require('./routes/'))

app.listen(port, (err) => {
    if (err) {
        console.log("Server Is Not Started!!!😞😞😞");
        return false;
    }

    console.log("Server Started Successfully😁😁😁");
})