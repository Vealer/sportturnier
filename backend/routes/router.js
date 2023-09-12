const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');
var currentUserID = "";

router.post('/contact', async (req, res) => {
    const { email, website, message } = req.body;
    const contactData = { email: email, website: website, message: message }
    const newContact = new schemas.Contact(contactData)
    const saveContact = await newContact.save()
    if (saveContact) res.send('Message sent. Thank you.')

    res.end()
})

router.post('/addTournament', async (req, res) => {
    const { sport, organizer, amount, location } = req.body;
    const newTournament = new schemas.Tournaments({
        organizer: organizer,
        location: location,
        sport: sport,
        amount: amount,
        user: currentUserID
    });

    newTournament.save()
        .then(results => {
            if (results) {
                res.redirect('/');
            } else {
                res.end('Error Saving.');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/new-competitionDB');
        });
    res.end()
})


router.get('/tournaments', async (req, res) => {
    const tournaments = schemas.Tournaments;
    tournaments.find({}).exec()
        .then(tournamentData => {
            if (tournamentData) res.end(tournamentData);
        })
        .catch(err => {
            console.log(err);
            res.end();
        });
});

router.delete('/tournaments/:id', async (req, res) => {
    const tournaments = schemas.Tournaments;
    try {
        const deletedTournament = await tournaments.findByIdAndDelete(req.params.id).exec();
        if (deletedTournament) {
            res.status(204).send();
        } else {
            res.status(404).send('Tournament not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});



router.get('/users', async (req, res) => {
    const users = schemas.Users

    const userData = await users.find({}).exec()
    if (userData) {
        res.send(JSON.stringify(userData))
    }

    res.send(userData);
})

router.post('/addUser', async (req, res) => {
    const { userName, password } = req.body;
    try {
      const existingUser = await schemas.Users.findOne({ username: userName }).exec();
      if (existingUser) {
        res.status(409).send('Der Benutzername existiert bereits. Wähle einen anderen.');
      } else {
        const user = { username: userName, password: password };
        const newUser = new schemas.Users(user);
        const newUserResult = await newUser.save();
        console.log('New user created!');
        currentUserID = newUserResult.id;
        res.redirect('/new-competitionDB');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    }
  });
  

router.post('/signIn', async (req, res) => {
    const { userName, password } = req.body;
    try {
      const user = await schemas.Users.findOne({ username: userName }).exec();
      if (user && user.password === password) {
        currentUserID = user.id;
        // res.redirect('/new-competitionDB');
      } else {
        res.status(401).send('Invalid username or password');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    }
  });
  

module.exports = router;