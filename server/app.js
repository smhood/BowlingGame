const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

const { apiRouter } = require('./routes');
// Recomended way for handling cors.
app.use(cors())

// Middleware for allowing body json requests.
app.use(express.json({ extended: false }));

app.use('/api', apiRouter);

app.get('/', (req, res) => res.send("Welcome to the Arcade!"));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

module.exports = app;