module.exports = {
    addRound: async (req,res) => {
        const {session} = req
        if (session.user) {
            const db = req.app.get('db')
            const {user_id, course_id, tee, numOfHoles, goal, roundComplete, startingHole} = req.body
            const createRound = await db.createRound({user_id, course_id, tee, numOfHoles, goal, roundComplete, startingHole})
            res.send(createRound[0])
        }
    },
    addHoleToRound: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {round_id, hole, score, fairway, gir, lostBall } = req.body
            const addStats = await db.addHoleToRound({round_id, hole, score, fairway, gir, lostball:lostBall})
            res.status(200).send('hole added to round')
        } else {
            res.send('Please Login')
        }
    },
    addRoundTotals: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {total_score,total_fairways,total_gir,total_lostball, round_id} = req.body
            const addTotals = await db.addRoundTotals({total_score,total_fairways,total_gir,total_lostball,round_id})
            res.status(200).send('totals added to round')
        } else {
            res.send('Please Login')
        }
    },
    getRoundList: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const {user_id} = session.user
            const getRoundList = await db.getRoundList({user_id})
            return res.send(getRoundList)
        } else {
            res.status(401).send('Please Login')
        }
    },
    getRound: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const round_id = req.params.id
            const getRound = await db.getRound({round_id})
            res.send(getRound)
        } else {
            res.status(401).send('Please Login')
        }
    },
    completeRound: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            const round_id = req.params.id
            console.log(round_id)
            const completeRound = await db.completeRound({round_id})
            if (completeRound) {
                res.send('Round Complete')
            } 
        }
    },
    postDummy: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            let user_id = 3
            let course_id = 2
            let tee = 'blue'
            let numOfHoles = 9
            let goal = 45
            let roundComplete = 'no'
            let startingHole = 1
            let date = '2019-06-1'
            let postRound = db.createRound({user_id, course_id, tee, numOfHoles, goal, roundComplete, startingHole})
            res.send(postRound)
        }
    },
    postDummyHoles: async (req,res) => {
        const db = req.app.get('db')
        const {session} = req
        if (session.user) {
            let round_id = req.params.id
            roundData = {
                fairway: ['yes','no','yes','no','yes','no','yes','no','yes'],
                gir: ['yes','no','yes','no','yes','no','yes','no','yes'],
                lostball: ['yes','no','yes','no','yes','no','yes','no','yes'],
                score: [4,5,6,4,5,6,4,5,6]
            }
            for (let i = 0; i <=8; i++) {
                const addStats = await db.addHoleToRound({
                    round_id, 
                    hole: i + 1, 
                    score: roundData.score[i], 
                    fairway: roundData.fairway[i], 
                    gir: roundData.gir[i], 
                    lostball: roundData.lostball[i]
                })
            }

            total_score = roundData.score.reduce((total, num) => {
                return total + Number(num)
            })
            let stringReduce = (stat) => {
                let roundTotal = roundData[stat].reduce(function(total, individualResult) {
                    if (individualResult in total) {
                      total[individualResult]++
                    } else {
                      total[individualResult] = 1
                    }
                    return total
                },{})
                if (roundTotal.yes) {
                    return roundTotal.yes
                } else {
                    return 0
                }
            }
            let total_fairways = stringReduce('fairway')
            let total_gir = stringReduce('gir')
            let total_lostball = stringReduce('lostball')

            const addTotals = await db.addRoundTotals({total_score,total_fairways,total_gir,total_lostball,round_id})
            res.send('success')
        }
    }
}