module.exports = {
    createCourse: async (req,res) => {
        const db = req.app.get('db')
        const {coursename, city, state, picture, name} = req.body
        const getCourse = await db.getCourse({coursename})
        if (getCourse[0]) return res.send('course already exists')
        const courseCreate = await db.courseCreate({coursename, city, state, picture, name})
        res.send(courseCreate)
    },
    getCourses: async (req, res) => {
        const db = req.app.get('db')
        const getCourses = await db.getCourses()
        res.send(getCourses)
    },
    getCourse: async (req,res) => {
        const db = req.app.get('db')
        const getCourse = await db.getCourse({course_id})
        if (getCourse[0]) return res.send(getCourse[0])
        return res.send('No Course Info Added Yet')
    },
    getCourseInfo: async (req,res) => {
        const db = req.app.get('db')
        const course_id = req.params.id
        const getCourseInfo = await db.getCourseInfo({course_id})
        if (getCourseInfo[0]) return res.send(getCourseInfo)
        return res.send('No Course Info Added Yet')
    },
    addHoleInfo: async (req,res) => {
        const db = req.app.get('db')
        const course_id = req.params.id
        const {hole,par,tee, distance} = req.body
        const addHoleInfo = db.addHoleInfo({course_id,hole, par,tee,distance})
        res.status(200)
    }

}