const config = require('../config')

const sqlite = require('sqlite')
const Hashes = require('jshashes')
const sha512 = new Hashes.SHA512()
const express = require('express')
const router = express.Router()

const dbPromise = sqlite.open(config.DB_PATH, { Promise })

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const db = await dbPromise
    await db.get('CREATE TABLE IF NOT EXISTS shortcuts (nick TEXT NOT NULL PRIMARY KEY, url TEXT NOT NULL);')
  } catch (err) {
    console.error(err)
    console.log('Could not create table')
  }
  res.render('index', {
    title: 'Redirect2'
  })
})

router.get('/:shortcut', async (req, res) => {
  let shortcut = req.params.shortcut

  try {
    const db = await dbPromise
    const result = await db.get('SELECT nick, url FROM shortcuts WHERE nick = ? LIMIT 1', shortcut)
    res.redirect(result.url)
  } catch (err) {
    res.redirect('/')
  }
})

router.use(async (req, res, next) => {
  if (req.method !== 'POST') {
    next()
    return
  }

  let password = req.body.password
  if (password && sha512.hex(password) === config.SECRET_HASH) {
    next()
    return
  } else {
    res.status(403);
    res.json({
      success: false,
      message: "You don't have permission to do this."
    })
  }
})

router.post('/new', async (req, res) => {
  let nick = req.body.nick
  let url = req.body.url

  if (!nick || !url) {
    res.status(400)
    res.json({
      success: false,
      message: 'nick and url not provided.'
    })
  }

  try {
    const db = await dbPromise
    await db.run('INSERT INTO shortcuts VALUES (?, ?)', [nick, url])

    res.json({
      success: true,
      message: 'Shortcut added.'
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
}) 


module.exports = router
