const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const db = require('./../db');

router.route('/concerts').get((req, res) => {
  res.json(db.module.concerts);
});

router.route('/concerts/random').get((req, res) => {
  const randomId = Math.floor((Math.random() * db.module.concerts.length) + 1);
  res.json(db.module.concerts[randomId])
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.module.concerts.filter( elem => elem.id == req.params.id))
});

router.route('/concerts').post((req, res) => {
  db.module.concerts.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });
  //Test res.json(db);
  res.json({message: 'ok'});
});

router.route('/concerts/:id').put((req, res) => {
  const element = db.module.concerts.filter(elem => elem.id == req.params.id);
  const position = db.module.concerts.indexOf(element[0]);
  db.module.concerts[position].author = req.body.author;
  db.module.concerts[position].text = req.body.text;
  //Test res.json(db);
  res.json({message: 'ok'});
});

router.route('/concerts:id').delete((req, res) => {
  const element = db.module.concerts.filter(elem => elem.id == req.params.id);
  const position = db.module.concerts.indexOf(element[0]);
  db.splice(position, 1);
  //Test res.json(db.module.concerts);
  res.json({message: 'ok'});
});

module.exports = router;