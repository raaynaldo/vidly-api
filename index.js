const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, title: 'Romance' },
  { id: 2, title: 'Action' },
  { id: 3, title: 'Horror' },
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.post('/api/genres', (req, res) => {
  // check if paramater is valid
  console.log(req.body);
  console.log(req.body.title);
  if (!req.body.title) {
    return res.status(400).send('The genre title is not existed');
  }

  // save to genres
  const genre = {
    id: genres.length + 1,
    title: req.body.title,
  };
  genres.push(genre);

  // return the genre
  return res.send(genre);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
