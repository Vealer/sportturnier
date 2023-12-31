const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');

router.post('/', async (req, res) => {
  const { sport, organizer, amount, location, tdate } = req.body;
  const newTournament = new schemas.Tournaments({
    organizer: organizer,
    location: location,
    sport: sport,
    amount: amount,
    user: req.user._id.toString(),
    date: tdate,
    plan: {team: 'Holzbein'},
  });

  newTournament.save()
    .then(results => {
      if (results) {
        console.log(results);
        res.redirect('/tournamentsDB');
      } else {
        res.end('Error Saving.');
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect('/new-competitionDB');
    });
})


router.get('/', async (req, res) => {
  const tournaments = schemas.Tournaments;
  tournaments.find({ user: req.user._id.toString() }).exec()
    .then(tournamentData => {
      if (tournamentData) res.send(tournamentData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send('Keine Turniere vorhanden!');
    });
});

router.get('/:id', async (req, res) => {
  const tournaments = schemas.Tournaments;
  tournaments.find({ _id: req.params.id }).exec()
    .then(tournamentData => {
      if (tournamentData) res.send(tournamentData);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send('Turnier nicht vorhanden!');
    });
});

router.put('/:id/plan', async (req, res) => {
  const tournaments = schemas.Tournaments;
  const tournamentId = req.params.id;
  const newPlan = req.body.plan;

  try {
    const tournament = await tournaments.findOneAndUpdate(
      { _id: tournamentId },
      { plan: newPlan },
      { new: true }
    );
    if (tournament) {
      res.send(tournament);
    } else {
      res.status(404).send('Turnier nicht vorhanden!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Serverfehler');
  }
});


router.delete('/:id', async (req, res) => {
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

module.exports = router;