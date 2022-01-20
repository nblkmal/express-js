const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(logger)

// for public stativ html view
app.use(express.static('public'))

// allow express access to html
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     console.log('Here')
//     res.render('index', { text: "BEWO" })
// })

const userRouter = require('./routes/users')

app.use('/users', userRouter)

// middleware
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(3030)