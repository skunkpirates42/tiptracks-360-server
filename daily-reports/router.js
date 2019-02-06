const express = require('express');
const bodyParser = require('body-parser');

const { DailyReport } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// GET all daily reports
router.get('/', (req, res) => {
  
});

// Save Daily Report to DB
router.post('/', (req, res) => {

});
