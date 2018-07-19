const sqlite = require('sqlite')
const express = require('express')
const sha256 = require('sha256')
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
