module.exports = {
    createUser: async (req,res) => {
        const {email,username, password} = req.body
        const db = req.app.get('db')
        const emailExists = await db.checkEmail({email})
        const userExists = await db.checkUsername({username})
        console.log (emailExists, userExists)
        if (userExists[0])  return res.status(409).send('Username already exists')
        if (emailExists[0]) return res.status(409).send('Email already exists')


    }
}