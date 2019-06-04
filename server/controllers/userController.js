const bcrypt = require('bcryptjs')
module.exports = {
    createUser: async (req,res) => {
        const {email,username, password, firstname, lastname, city, state, favoritecourse } = req.body
        const db = req.app.get('db')
        const emailExists = await db.checkEmail({email})
        const userExists = await db.checkUsername({username})
        if (userExists[0])   return res.status(409).send('Username already exists')
        if (emailExists[0])  return res.status(409).send('Email already exists')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const userCreate = await db.createUser({email, username, hash, firstname, lastname, city, state, favoritecourse})
        return res.status(200).send(userCreate)
    },
    loginUser: async (req,res) => {
        const {username} = req.body
        const db = req.app.get('db')
        const userExists = await db.checkUsername({username})
        if (!userExists[0]) return res.status(401).send("Username/password incorrect")
        const authenticated = bcrypt.compareSync(req.body.password,userExists[0].password)
        if (authenticated) {
            const {user_id, username, firstname, lastname, email, city, state, favoritecourse} = userExists[0]
            req.session.user = {user_id, username, firstname, lastname, email, city, state, favoritecourse}
            return res.status(200).send({user_id, username, firstname, lastname, email, city, state, favoritecourse})
        } else{
            res.status(401).send("Username/password incorrect")
        }
    },
    getPotentialFriends: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session) {
            const {user_id} = session.user
            const potentialFriendList = await db.getPotentialFriends({user_id})
            res.send(potentialFriendList) 
        }
    },
    addPotentialFriend: async (req,res) => {
        const {friendFirst, friendLast} = req.body
        const {session} = req
        const db = req.app.get('db')
        if (session.user) {
            console.log(session.user)
            const {user_id} = session.user
            const getFriendInfo = await db.checkName({friendFirst, friendLast})
            if (getFriendInfo[0]) {
                const friend_id = getFriendInfo[0].user_id
                addFriend = await db.addPotentialFriend({user_id, friend_id})
                return res.status(200).send("Waiting for friend notification")
            } else {
              return res.status(200).send("Could not find person with that information")
            }
        }
    },
    confirmFriendRequest: async (req,res) => {
        const db = req.app.get('db')
        const {friend_id} = req.body
        const {session} = req
        if (session.user) {
            user_id = session.user.user_id
            const removeFromPotential = await db.removeFromPotential({friend_id,user_id})
            const addFriend = await db.addFriend({friend_id, user_id})
            res.status(200).send('Friend Added')
        } else {
            res.status(401).send('Please Login')
        }
    }

}