const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');
const { Await } = require('react-router-dom');



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
    });

    try {
        const results = await newTournament.save();
        if (results) {
            res.redirect('/');
        } else {
            res.end('Error Saving.');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/new-competitionDB');
    }

    res.end()
})

router.get('/users', async (req, res) => {
    const users = schemas.Users

    const userData = await users.find({}).exec()
    if (userData) {
        res.send(JSON.stringify(userData))
    }

    res.send(userData);
})

module.exports = router;