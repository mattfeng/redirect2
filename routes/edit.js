const sqlite = require('sqlite')
const sha256 = require('sha256')
const express = require('express')
const router = express.Router()

const dbPromise = sqlite.open('./db/shortcuts.db', { Promise })

router.get('/', async (req, res) => {
  let currentShortcuts = []

  try {
    const db = await dbPromise
    currentShortcuts = await db.all('SELECT nick, url FROM shortcuts ORDER BY nick')
  } catch (err) {
    console.log("Couldn't fetch results from the database.")
  }

  res.render('edit', {
    title: 'Edit shortcuts',
    shortcuts: currentShortcuts
  })

})

router.use(async (req, res, next) => {
  if (req.method !== 'POST') {
    next()
    return
  }

  let password = req.body.password
  const secret = '8da01678031fde4d8a24d06192b674fad47d8e4874938493e7add38b29ac3b29'
  if (password && sha256.x2(password) === secret) {
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

router.post('/', async (req, res) => {
  let url = req.body.url
  let nick = req.body.nick

  let query = 'UPDATE shortcuts SET url = ? WHERE nick = ?'

  try {
    const db = await dbPromise
    await db.run(query, [url, nick])
  } catch (err) {
    res.json({
      success: false,
      message: "Couldn't update database."
    })
    res.end()
    return
  }

  res.redirect('/edit')
})

module.exports = router