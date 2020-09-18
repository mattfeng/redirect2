var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var sassMiddleware = require('node-sass-middleware')

var editRouter = require('./routes/edit')
var indexRouter = require('./routes/index')
const config = require('./config')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/edit', editRouter)
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (config.DEVELOPMENT) {
    res.locals.message = err.message
    res.locals.error = err

    // render the error page
    res.status(err.status || 500)
    res.render('error', {
      title: 'Error'
    })
  } else {
    res.status(err.status || 500)
    res.render('error-public', {
      title: 'Error'
    })
  }
})

module.exports = app
