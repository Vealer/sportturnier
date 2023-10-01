const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const schemas = require('./models/schemas');
require('dotenv').config();
const MongoStore = require('connect-mongo');

const authenticationRouter = require('./routes/authentication-router');
const tournamentRouter = require('./routes/tournament-router');

const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

// Apply middleware functions
app.use(morgan(':method :url :status'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 //  30 Tage
    }
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up database
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.MONGODB_URI, dbOptions)
    .then(() => console.log('DB connection established'))
    .catch(err => console.error(err));

passport.use(schemas.User.createStrategy());
passport.serializeUser(schemas.User.serializeUser());
passport.deserializeUser(schemas.User.deserializeUser());

// Set public directory
app.use(express.static('public'))

// Register routers
app.use('/api', authenticationRouter);
app.use('/api/tournaments', tournamentRouter);

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('listening on port ' + port)
})

