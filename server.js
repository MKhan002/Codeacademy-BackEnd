const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
app.use(express.static('public'));
const PORT = process.env.PORT || 4001;


app.use(express.json());

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    //console.log(randomQuote); // Log the random quote to see what is returned
    res.json(randomQuote);
});
app.get('/api/quotes', (req, res) => {
    //console.log(quotes);
    res.json(quotes);
});
app.get('/api/quotes', (req, res) => {
    const author = req.query.person;
    let filteredQuotes = quotes;
    console.log(author);
    if (author) {
        filteredQuotes = quotes.filter(quote => quote.person === author);
    }

    const randomQuote = getRandomElement(filteredQuotes);
    res.json({ quote: randomQuote });
});

app.post('/api/quotes', (req, res) => {
    console.log(req.query.quote)
    if (req.query.quote && req.query.person) {
        const receivedQuote = {
            'quote': req.query.quote,
            'person': req.query.person
        }
        quotes.push(receivedQuote);
        res.status(201).send({ quote: receivedQuote });
    } else {
        res.status(400).send();
    }
});


app.listen(PORT, () => {
    console.log('App is listening...');
})



