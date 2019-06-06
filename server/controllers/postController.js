module.exports = {
    getAllPosts: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {user_id} = session.user
            const getAllPosts = await db.getAllPosts({user_id})  
            res.status(200).send(getAllPosts)
        }
    },
    createRoundPost: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {user_id, round_id} = session.user
            const {user_comment} = req.body
            const createRoundPost = db.createRoundPost({user_id, round_id, user_comment})
            res.status(200).send('Post Created')
        }
    }
}