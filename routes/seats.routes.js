const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const db = require('./../db');

router.route('/seats').get((req, res) => {
  res.json(db.module.seats);
});

router.route('/seats/random').get((req, res) => {
  const randomId = Math.floor((Math.random() * db.module.seats.length) + 1);
  res.json(db.module.seats[randomId])
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.module.seats.filter( elem => elem.id == req.params.id))
});

router.route('/seats').post((req, res) => {
  db.module.seats.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });
  //Test res.json(db);
  res.json({message: 'ok'});
});

router.route('/seats/:id').put((req, res) => {
  const element = db.module.seats.filter(elem => elem.id == req.params.id);
  const position = db.module.seats.indexOf(element[0]);
  db.module.seats[position].author = req.body.author;
  db.module.seats[position].text = req.body.text;
  //Test res.json(db);
  res.json({message: 'ok'});
});

router.route('/seats:id').delete((req, res) => {
  const element = db.module.seats.filter(elem => elem.id == req.params.id);
  const position = db.module.seats.indexOf(element[0]);
  db.splice(position, 1);
  //Test res.json(db.module.seats);
  res.json({message: 'ok'});
});

module.exports = router;