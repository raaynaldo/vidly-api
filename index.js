const Joi = require('joi');
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

app.get('/api/genres/:id', (req, res) => {
  const id = req.params.id;
  const genre = genres.find((genre) => genre.id === parseInt(id));
  if (!genre) {
    return res.status(400).send('The genre with given ID was not found');
  }

  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  // check if paramater is valid
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
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

app.put('/api/genres/:id', (req, res) => {
  const id = req.params.id;
  const genre = genres.find((genre) => genre.id === +id);
  if (!genre) {
    return res.status(400).send('The genre with given ID was not found');
  }

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  genre.title = req.body.title;

  res.send(genre);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
