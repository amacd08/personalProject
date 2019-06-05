module.exports = {
    addRound: async (req,res) => {
        const {session} = req
        if (session.user) {
            const db = req.app.get('db')
            const {user_id, course_id} = req.body
            const createRound = await db.createRound({user_id, course_id})
            res.send(createRound)
        }
    },
    addHoleToRound: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {round_id, hole, score, fairway, gir, lostball } = req.body
            const addStats = await db.addHoleToRound({round_id, hole, score, fairway, gir})
            res.status(200)
        } else {
            res.send('Please login')
        }
    },
    getRoundList: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {user_id} = req.body
            const getRoundList = await db.getRoundList({user_id})
            res.send(getRoundList)
        } else {
            res.status(401).send('Please Login')
        }
    },
    getRound: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {round_id} = req.body
            const getRound = await db.getround({round_id})
            res.send(getRound)
        } else {
            res.status(401).send('Please Login')
        }
    }
}