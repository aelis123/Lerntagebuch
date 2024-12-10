const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Benutzermodell importieren
const router = express.Router();

// Registrierung
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).send('Benutzer registriert');
  } catch (err) {
    res.status(400).send('Fehler bei der Registrierung');
  }
});

// Anmeldung
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('Benutzer nicht gefunden');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Falsches Passwort');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).send('Fehler bei der Anmeldung');
  }
});

module.exports = router;
