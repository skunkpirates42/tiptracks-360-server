const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const { Tip } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// GET all daily reports
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  /* ********MOMENT SCRATCH TEST STUFF*********** */
  const now = moment();
  const weekAgo = moment().subtract(7, 'd');
  // const monthAgo = moment().subtract(1, 'M');
  // console.log('now is ========', now.format('dddd, MMMM Do YYYY'));
  console.log('a week ago is ========', weekAgo.format('dddd, MMMM Do YYYY'));
  // console.log('a month ago is ========', monthAgo.format('dddd, MMMM Do YYYY'));

  const difference = now.diff(weekAgo, 'days');
  console.log(difference);
  /* ********MOMENT SCRATCH TEST STUFF*********** */
    
  let filter = { userId };

  /* { date: { $lte: weekAgo} } */
  return Tip.find(filter) 
    .then(results => res.json(results))
    .catch(err => next(err));
});

// Save Daily Report to DB
router.post('/', jsonParser, (req, res, next) => {
  const { date, baseWage, hours, notes, tippedOut, totalTips } = req.body;
  const userId = req.user.id;
  const formattedDate = moment(date).format('dddd, MMMM Do YYYY');
  const newReport = { date, formattedDate, baseWage, hours, notes, tippedOut, totalTips, userId };
  
  return Tip.create(newReport)
    .then(report => {
      return res.status(201).json(report);
    })
    .catch(err => next(err));
});

module.exports = { router };