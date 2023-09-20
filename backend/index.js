const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
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

// Passport configuration

passport.use(schemas.User.createStrategy());

passport.serializeUser(schemas.User.serializeUser());
passport.deserializeUser(schemas.User.deserializeUser());

app.get('/secrets', function (req, res) {
    if (req.isAuthenticated()) {
        res.status(200).send('OK');
        // res.redirect('/tournamtentsDB');
    } else {
        res.redirect('/login');
    }
});

app.post("/register", function (req, res, next) {
    const { userName, password } = req.body;
    schemas.User.register({ username: userName }, password, function (err, user) {
        if (err) {
            console.error(err);
            return res.send(err);
        }

        // Logge den Benutzer ein, nachdem er sich registriert hat
        req.login(user, function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            console.log(user);
            return res.status(200).send('OK');
        });
    });
});




app.post('/signIn', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.error('Authentication error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        console.log('bis hier')
        req.logIn(user, function (err) {
            if (err) {
                console.error('Login error:', err);
                return res.status(500).json({ message: 'Failed to login user.' });
            }
            console.log('User logged in:', user);
            return res.status(200).json({ message: 'OK', userId: user._id });
        });
    })(req, res, next);
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), function(req, res) {
    console.log(req.user.username);
    // res.redirect('/~' + req.user.username);
  });




app.get('/user', function (req, res) {
    if (req.isAuthenticated()) {
        res.send(JSON.stringify(req.user._id))
    } else {
        console.log('kein user is not logged in')
        res.status(404).send('User not found');

    }
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
})

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('listening on port ' + port)
})

