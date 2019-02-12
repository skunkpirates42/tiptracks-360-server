const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Job } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  let filter = { userId };

  return Job.find(filter)
    .then(results => res.json(results))
    .catch(err => next(err));
});

router.post('/', jsonParser, (req, res, next) => {
  const { job, position, baseWage } = req.body;
  const userId = req.user.id;
  
  // Validate users
  if (!job) {
    const err = new Error('Missing `job` in request body');
    err.status = 400;
    return next(err);
  }

  if (!baseWage) {
    const err = new Error('Missing `baseWage` in request body');
    err.status = 400;
    return next(err);
  }

  const newJob = { job, baseWage, position, userId };
  
  return Job.create(newJob)
    .then(job => {
      return res.status(201).json(job);
    })
    .catch(err => next(err));
});

module.exports = { router };