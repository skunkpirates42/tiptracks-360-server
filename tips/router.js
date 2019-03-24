const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Tip } = require('./models');
const { Job } = require('../jobs/index');

const router = express.Router();

const jsonParser = bodyParser.json();

// GET all daily reports
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  let filter = { userId };

  return Tip.find(filter)
    .sort({date: 1})
    .then(results => res.json(results))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  let filter = { userId, _id: id };

  return Tip.findById(filter)
    .then(results => {
      if (!results) {
        next();
      }
      res.json(results);
    })
    .catch(err => next(err));
});

// Save Daily Report to DB
router.post('/', jsonParser, (req, res, next) => {
  const { date, baseWage, hours, notes, tippedOut, totalTips } = req.body;
  const userId = req.user.id;

  return Job.find({ userId}) 
    .then(results => {
      const job = results[0].job;
      const newReport = { date, baseWage, hours, notes, tippedOut, totalTips, userId, job };
      return Tip.create(newReport);
    })
    .then(report => {
      return res.location(`${req.originalUrl}/${report.id}`).status(201).json(report);
    })
    .catch(err => next(err));
});

router.put('/:id', jsonParser, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const updateTip = {};
  const updateTipFields = [
    'date',
    'totalTips',
    'tippedOut',
    'baseWage',
    'hours',
    'notes'
  ];

  updateTipFields.forEach(field => {
    if (field in req.body) {
      updateTip[field] = req.body[field];
    }
  });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Tip.findOneAndUpdate({_id: id, userId}, updateTip, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });

});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Tip.findOneAndDelete({_id: id, userId})
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = { router };