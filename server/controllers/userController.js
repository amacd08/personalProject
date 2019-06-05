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
        const userInfo = await db.getUser({user_id})
        return res.status(200).send(userInfo)
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
    logOut: async (req,res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getPotentialFriends: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session) {
            const {user_id} = session.user
            //This DB call flips user_id into friend_id in order to collect all requests from other users to this user
            //where  pending_friends.friend_id = ${user_id} -> From the db script
            const potentialFriendList = await db.getPotentialFriends({user_id})
            res.send(potentialFriendList) 
        }
    },
    addPotentialFriend: async (req,res) => {
        const {friendFirst, friendLast} = req.body
        const {session} = req
        const db = req.app.get('db')
        if (session.user) {
            //user_id here represents the user who is making the original friend request. friend_id represents the user they are connecting with.
            const {user_id} = session.user
            const getFriendInfo = await db.checkName({friendFirst, friendLast})
            if (getFriendInfo[0]) {
                const friend_id = getFriendInfo[0].user_id
                const checkPotentialFriendList = await db.checkPotentialFriend({user_id,friend_id})
                const checkFriendList = await db.checkFriend({user_id,friend_id})
                if (checkPotentialFriendList[0]) return res.send('Request already made')    
                if (checkFriendList[0]) return res.send('Friend already connected') 
                const addPotentialFriend = await db.addPotentialFriend({user_id, friend_id})
                return res.status(200).send("Waiting for friend notification")
            } else {
              return res.status(404).send("Could not find person with that information")
            }
        }
    },
    confirmFriendRequest: async (req,res) => {
        const db = req.app.get('db')
        const {user_id} = req.body
        const {session} = req
        if (session.user) {
            //user_id now represents not the user who is logged in but the user originating the friend request. 
            //friend_id is the existing user.  Remember that on the potential friend list, associating a users user_id with friend_id will collect all requests made to the user. Associating the user_id with the pending_friends.user_id will call all friend requests they originated.
            //I don't like this flip-flop in values but it works for now. 
            const friend_id = session.user.user_id
            const removeFromPotential = await db.removePotential({friend_id,user_id})
            const addFriends = await db.addFriend({friend_id, user_id})
            res.status(200).send('Friend Added')
        } else {
            res.status(401).send('Please Login')
        }
    },
    rejectFriendRequest: async (req,res) => {
        const db = req.app.get('db')
        const {user_id} = req.body
        const {session} = req
        if (session.user) {
            //another note - user_id does not get associated with the logged in user. In the pending_friends list the logged in user is 
            //the friend_id. .. 
            const friend_id = session.user.user_id
            const removeFromPotential = await db.removePotential({firend_id, user_id})
            res.status(200).send('Friend request removed')
        } else {
            res.status(401).send('Please Login')
        }
    },
    getFriends: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {user_id} = session.user
            //This DB call flips user_id into friend_id in order to collect all requests from other users to this user
            //where  pending_friends.friend_id = ${user_id} -> From the db script
            const friendList = await db.getFriends({user_id})
            res.send(friendList) 
        }
    }

}