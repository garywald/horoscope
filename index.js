const express = require('express');
const { getSign } = require('horoscope');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
app.use(helmet())
app.use(cors());
const port = 3000;

app.get('/signHoroscope', (req, res) => {
    const date = req.query.date;
    // Validate date
    if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(date)) {
        return res.status(400).send({ error: 'Invalid date format.' });
    }
    //get month and day from the given date in the number format
    const month = parseInt(date.split('-')[1]);
    const day = parseInt(date.split('-')[2]);
    console.log(month, day);
    try {
        const horoscope = getSign({month, day});
        res.send({sign: horoscope});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while getting the horoscope.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;