const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const { apiRouter } = require('./routes');

// Middle ware for allowing body json requests.
app.use(express.json({ extended: false }));

app.use('/api', apiRouter);

app.get('/', (req, res) => res.send("Welcome to the Arcade!"));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

module.exports = app;