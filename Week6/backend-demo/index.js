const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

const tweets = [
    {
        id: 1, 
        user: 'Vincent',  
        tweets: "I'm voting for Joe Biden"
    },
    {
        id: 2, 
        user: 'Zara',
        tweets: "I'm voting for Mike Pence"
    }
];

app.get('/', (req, res) => {
    console.log('Hello server');
    res.send('Hello client');
});
app.get('/tweets', (req, res) => {
    res.send(tweets);
});
app.get('/tweets/:user', (req, res) => {
    let index = tweets.find(t => t.user === req.params.user);
    if (index) {
        res.send(index);
    }
    else {
        res.status(404).send('User not found');
    }
});

app.post('/tweets', (req, res) => {
    let newTweet = {
        id: tweets.length + 1,
        user: req.body.user,
        tweets: req.body.tweets
    };
    tweets.push(newTweet);
    res.send(newTweet);
});

const port = process.env.PORT;
console.log(`http://localhost:${port}/`);
app.listen(port, () => console.log(`Server is running on port ${port}`));