const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Users List")
})

router.get('/create', (req, res) => {
    res.render('user/create')
})

router.get('/new', (req, res) => {
    res.send('ID')
})

router.post('/', (req, res) => {
    const { username, password } = req.body

    if(username && password) {
        console.log(username, password)
        try {
            db.promise().query(`INSERT INTO USERS VALUES('${username}', '${password}')`)
            res.status(201).send({ message: 'User created' })
        } catch (error) {
            console.log(error)
        }
    }
})
// router.post('/', (req, res) => {
//     const isValid = true
//     if(isValid) {
//         users.push({ name: req.body.firstName })
//         res.redirect(`users/${users.length - 1}`)
//     } else {
//         console.log("error")
//         res.render('users/new', { firstName: req.body.firstName })
//     }
// })

router.route('/:id')
    .get((req, res) => {
        res.send(`User ID ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update user ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete user ID ${req.params.id}`)
    })

// collection of users
const users = [{ name: "nabil" }, { name: "akmal" }]

// middleware
router.param('id', (req, res, next, id) => {
    req.user = users[id]
    // console.log(users)
    next()
})

module.exports = router