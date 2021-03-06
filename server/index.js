const express=require('express')
require('dotenv').config()
const session=require('express-session')
const massive=require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
courseController = require('./controllers/courseController')
userController = require('./controllers/userController')
roundController = require('./controllers/roundController')
postController = require('./controllers/postController')

const app = express()
app.use( express.static( `${__dirname}/../build` ) )
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

app.get('/user/info', userController.userInfo)
//Create user during registration
app.post('/user/registration', userController.createUser)
//log existing user in
app.post('/user/login', userController.loginUser)
//Log out user
app.get('/user/logout', userController.logOut)
//make friend request
app.post('/user/addFriend', userController.addPotentialFriend)
//get list of requests made to you
app.get('/user/getPotentialFriends', userController.getPotentialFriends)
//confirm request made to you
app.put('/user/confirmFriend', userController.confirmFriendRequest)
//reject friend request
app.put('/user/rejectFriend', userController.rejectFriendRequest)
//get friends list
app.get('/user/getFriends', userController.getFriends)
//get course list
app.get('/course/getCourses', courseController.getCourses)
//get course list
app.get('/course/getCourse/:id', courseController.getCourse)
//add new course to courses table
app.post('/course/createCourse', courseController.createCourse)
//get specific course information
app.get('/course/getCourseInfo/:id', courseController.getCourseInfo)
//add single hole to course_info table
app.post('/course/addHoleInfo/:id', courseController.insertHoleInfo)
app.put('/course/addHoleInfo/:id', courseController.updateHoleInfo)
//golfer adds round 
app.post('/round/create', roundController.addRound)
//adds stats to round
app.post('/round/addHoleToRound', roundController.addHoleToRound)
//get golfers specific round 
app.get('/round/getRound/:id', roundController.getRound)
//get all round information
app.get('/round/getRoundList', roundController.getRoundList)
//create Post
app.post('post/round', postController.createRoundPost)
//add totals to round_info
app.put('/round/addRoundTotals', roundController.addRoundTotals)
//complete round in db
app.put('/round/completeRound/:id', roundController.completeRound)
//get friends posts
app.get('/post/getFriendsPosts', postController.getAllPosts)
//insert dummy round
app.get('/round/postDummy', roundController.postDummy)
app.get('/round/postDummyHoles/:id', roundController.postDummyHoles)
app.delete('/round/delete/:id', roundController.deleteRound)



