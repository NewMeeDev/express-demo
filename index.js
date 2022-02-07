const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

// GET: all courses (http://localhost:3000/api/courses)
app.get('/api/courses', (req, res) => {
  res.send(['1', '2', '3']);
});

// GET: course by id (http://localhost:3000/api/courses/1)
app.get('/api/courses/:id', (req, res) => {
  res.send(req.params.id);
});

// GET: display params of the request (http://localhost:3000/api/posts/2022/12)
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);
});

// GET: display queryParams of the request (http://localhost:3000/api/posts/2022/12/query?sortBy=name)
app.get('/api/posts/:year/:month/query', (req, res) => {
  res.send(req.query);
});

// get port from environment if set, or set it to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening @Port ${port}...`);
})