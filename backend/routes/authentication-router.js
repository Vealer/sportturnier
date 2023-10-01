const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');

router.get('/secrets', function (req, res) {
    if (req.isAuthenticated()) {
        res.status(200).send('OK');
    } else {
        res.redirect('/');
    }
});

router.post("/register", function (req, res, next) {
    const { username, password } = req.body;
    schemas.User.register({ username: username }, password, function (err, user) {
        if (err) {
            console.error(err);
            return res.send(err);
        }

        req.login(user, function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.status(200).send('OK');
        });
    });
});


router.post('/signIn', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.error('Authentication error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error('Login error:', err);
                return res.status(500).json({ message: 'Failed to login user.' });
            }
            console.log('User logged in:', user);
            req.session.userId = user._id;
            return res.status(200).json({ message: 'OK', userId: user._id });
        });
    })(req, res, next);
});


router.get('/user', function (req, res) {
    console.log('User logged in:', req.session.userId);
    if (req.isAuthenticated()) {
        res.send(JSON.stringify(req.user))
        console.log('User logged in:', req.user);
    } else {
        console.log('kein user eingeloggt')
        res.status(404).send([]);
    }
});


router.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
        if(err) {
            return res.status(500).send('Es gab einen Fehler beim Ausloggen.');
        } else {
            return res.status(200).send('OK');
        }
    });
});

module.exports = router;