const express = require("express");
const router = express.Router();

const Controller = require('./controller');

router.post('/compute', Controller.calculate_split);

module.exports = router;