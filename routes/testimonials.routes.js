const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.module.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomId = Math.floor((Math.random() * db.module.testimonials.length) + 1);
  res.json(db.module.testimonials[randomId])
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.module.testimonials.filter( elem => elem.id == req.params.id))
});

router.route('/testimonials').post((req, res) => {
  db.module.testimonials.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });
  //Test res.json(db);
  res.json({message: 'ok'});
});

router.route('/testimonials/:id').put((req, res) => {
  const element = db.module.testimonials.filter(elem => elem.id == req.params.id);
  const position = db.module.testimonials.indexOf(element[0]);
  db.module.testimonials[position].author = req.body.author;
  db.module.testimonials[position].text = req.body.text;
  //Test res.json(db);
  res.json({message: 'ok'});
});

router.route('/testimonials:id').delete((req, res) => {
  const element = db.module.testimonials.filter(elem => elem.id == req.params.id);
  const position = db.module.testimonials.indexOf(element[0]);
  db.splice(position, 1);
  //Test res.json(db.module.testimonials);
  res.json({message: 'ok'});
});

module.exports = router;