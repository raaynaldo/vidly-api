const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  {
    id: 1,
    title: 'Romnace',
    id: 2,
    title: 'Action',
    id: 3,
    title: 'horror',
  },
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
