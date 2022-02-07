// https://www.youtube.com/watch?v=pKd0Rpw7O48 (52:36)


const Joi = require('joi');
const express = require('express');
//const { existsSync } = require('fs');
const app = express();

// activate the use of JSON middleware in our app
// it is deactivated in express by standard
app.use(express.json());

// get port from environment if set, or set it to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening @Port ${port}...`);
})

// the array with all courses
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

// GET: the root
app.get('/', (req, res) => {
  res.send('Hello World !!! This is our root of the endpoint.');
});

// GET: all courses (http://localhost:3000/api/courses)
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// GET: course by id (http://localhost:3000/api/courses/1)
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found!') 
  } else {
    res.send(course);
  }
});

// GET: display params of the request (http://localhost:3000/api/posts/2022/12)
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params);
});

// GET: display queryParams of the request (http://localhost:3000/api/posts/2022/12/query?sortBy=name)
app.get('/api/posts/:year/:month/query', (req, res) => {
  res.send(req.query);
});

// POST: a course
app.post('/api/courses', (req, res) => {

  const { error } = validateCourse(req.body); // { error } = result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  };

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// PUT: update a course (http://localhost:3000/api/posts/:id)
app.put('/api/courses/:id', (req, res) => {

  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found!')
  };

  const { error } = validateCourse(req.body); // { error } = result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  };

  course.name = req.body.name;
  res.send(course);
});


// a function for validation of the request-body for every PUT- and POST-methods
function validateCourse(course) {
  const schema = Joi.object({ 
    name: Joi.string().min(3).required()
  });
  return schema.validate(course);
}; 