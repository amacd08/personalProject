module.exports = {
    createCourse: async (req,res) => {
        const db = req.app.get('db')
        let {coursename, city, state, picture} = req.body
        coursename = coursename.toLowerCase()
        const getCourse = await db.getCourse({coursename})
        if (getCourse[0]) return res.send('course already exists')
        const courseCreate = await db.courseCreate({coursename, city, state, picture})
        res.send(courseCreate)
    },
    getCourses: async (req, res) => {
        const db = req.app.get('db')
        const getCourses = await db.getCourses()
        res.send(getCourses)
    },
    getCourse: async (req,res) => {
        const db = req.app.get('db')
        const course_id = req.params.id
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
    insertHoleInfo: async (req,res) => {
        const db = req.app.get('db')
        const course_id = req.params.id
        let {hole,par,tee, distance} = req.body
        par = Number(par)
        distance = Number(distance)
        console.log(req.body)
        if (tee === 'blue') {
            const addHoleInfo = await db.addHoleInfoBlue({course_id,hole, par,tee,distance})
        } else if (tee === 'red') {
            const addHoleInfo =await  db.addHoleInfoRed({course_id,hole, par,tee,distance})
        } else if (tee === 'white'){
            const addHoleInfo = await db.addHoleInfoWhite({course_id,hole, par,tee,distance})
        }
        return res.sendStatus(200)
    },
    updateHoleInfo: async (req,res) => {
        const db = req.app.get('db')
        const course_id = req.params.id
        let {hole,par,tee, distance} = req.body
        distance = Number(distance)
        console.log(req.body)
        if (tee === 'blue') {
            const updateHoleInfo = await db.updateHoleInfoBlue({course_id,hole,distance})
        } else if (tee === 'red') {
            const updateHoleInfo =await  db.updateHoleInfoRed({course_id,hole, par,tee,distance})
        } else if (tee === 'white'){
            const updateHoleInfo = await db.updateHoleInfoWhite({course_id,hole, par,tee,distance})
        }
        return res.sendStatus(200)
    }
}