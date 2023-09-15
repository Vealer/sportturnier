const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
// const passportLocalMongoose = require('passport-local-mongoose')
const schemas = require('./models/schemas');


require('dotenv').config()

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);




const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI, dbOptions)
    .then(() => console.log('DB connection established'))
    .catch(err => console.error(err))
// angelu
// mongoose.set("useCreateIndex", true);

passport.use(schemas.Users.createStrategy());

passport.serializeUser(schemas.Users.serializeUser());
passport.deserializeUser(schemas.Users.deserializeUser());

app.get('/secrets', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/tournamtentsDB');
    } else {
        res.redirect('/login');
    }
});

app.post("/register", function (req, res) {

    schemas.Users.register({ username: req.params.username }, req.body.password, function (err, user) {
        if (err) {
            console.error(err);
            res.redirect('/register')
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/secrets');
            })
        }
    });

})

app.post('/signIn', async (req, res) => {
    const { userName, password } = req.body;
    const user = new schemas.Users({
        username: userName,
        password: password
    });
    req.login(user, function (err, user) {
        if (err) {
            console.error(err);
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/secrets');
            })
        }
    });
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
})

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('listening on port ' + port)
})

