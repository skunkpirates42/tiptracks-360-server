const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const { Tip } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// GET all daily reports
router.get('/', (req, res) => {
  return Tip.find({userId: req.user.id})
    .then(results => res.json(results))
    .catch(err => res.status(500).json({ message: 'Internal server error'}));
});

// Save Daily Report to DB
router.post('/', jsonParser, (req, res) => {
  const { date, baseWage, hours, notes, tippedOut, totalTips } = req.body;
  const userId = req.user.id;
  const formattedDate = moment(date).format('dddd, MMMM Do YYYY');
  const newReport = { date, formattedDate, baseWage, hours, notes, tippedOut, totalTips, userId };
  
  return Tip.create(newReport)
    .then(report => {
      return res.status(201).json(report);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ code: 500, message: 'Internal server error'});
    });
});

module.exports = { router };