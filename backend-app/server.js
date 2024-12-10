const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Routen importieren
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes); // Routen verwenden

// MongoDB Verbindung
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Datenbank verbunden'))
  .catch((err) => console.error('Fehler bei der Datenbankverbindung:', err));

// Einfache Route
app.get('/', (req, res) => {
  res.send('Backend läuft!');
});

// Start des Servers
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
