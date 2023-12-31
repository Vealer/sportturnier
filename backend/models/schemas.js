const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    entryDate: { type: Date, default: Date.now() },
})

userSchema.plugin(passportLocalMongoose);

const contactSchema = new Schema({
    name: { type: String, required: true },
    website: { type: String, required: true },
    message: { type: String, required: true },
    entryDate: { type: Date, default: Date.now() },
});

const tournamentSchema = new Schema({
    organizer: { type: String, required: true },
    location: { type: String, required: true },
    sport: { type: String, required: true },
    amount: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: String, required: true },
    plan: { type: Object, required: true },
});

const User = mongoose.model('User', userSchema, 'users');
const Tournaments = mongoose.model('Tournaments', tournamentSchema, 'turniere');
const Contact = mongoose.model('Contact', contactSchema, 'contact_form');
const mySchemas = { 'User': User, 'Contact': Contact, 'Tournaments': Tournaments }

module.exports = mySchemas;