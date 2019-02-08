const express = require('express');
const bodyParser = require('body-parser');
const { Tip } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// GET all daily reports
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  let filter = { userId };

  return Tip.find(filter) 
    .then(results => res.json(results))
    .catch(err => next(err));
});

// Save Daily Report to DB
router.post('/', jsonParser, (req, res, next) => {
  const { date, baseWage, hours, notes, tippedOut, totalTips } = req.body;
  const userId = req.user.id;
  const newReport = { date, baseWage, hours, notes, tippedOut, totalTips, userId };
  
  return Tip.create(newReport)
    .then(report => {
      return res.status(201).json(report);
    })
    .catch(err => next(err));
});

module.exports = { router };