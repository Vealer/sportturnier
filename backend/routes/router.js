const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');
var currentUserID = "guest";

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
        res.redirect('/tournamentsDB');
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
  tournaments.find({ user: currentUserID }).exec()
    .then(tournamentData => {
      if (tournamentData) res.send(tournamentData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send('Keine Turniere vorhanden!');
    });
});

router.get('/singleTournament/:id', async (req, res) => {
  const tournaments = schemas.Tournaments;
  tournaments.find({ id: req.params.id }).exec()
    .then(tournamentData => {
      if (tournamentData) res.send(tournamentData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send('Turnier nicht vorhanden!');
    });
});

router.delete('/tournaments/:id', async (req, res) => {
  const tournaments = schemas.Tournaments;
  try {
    const deletedTournament = await tournaments.findByIdAndDelete(req.params.id).exec();
    if (deletedTournament) {
      res.status(200).send('OK');
    } else {
      res.status(404).send('Tournament not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});



router.get('/user', async (req, res) => {
  const currentUser = await schemas.Users.findOne({ id: currentUserID }).exec();
  if (currentUser) {
    res.send(JSON.stringify(currentUser))
  }

  res.status(404).send('User not found');
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
      res.status(200).send('OK');
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
      res.status(200).send('OK');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;