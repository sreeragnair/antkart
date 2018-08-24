var express = require('express');
var router = express.Router();
var auth = require("../controller/AuthController.js");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
