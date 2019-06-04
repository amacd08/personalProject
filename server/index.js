const express=require('express')
require('dotenv').config()
const session=require('express-session')
const massive=require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
courseController = require('./controllers/courseController')
userController = require('./controllers/userController')

const app = express()
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db',db)
    console.log('database set!')
    app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
})

app.get('/user', userController.createUser)
