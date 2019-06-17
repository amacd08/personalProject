import axios from 'axios'
const initialState = {
    round_id: '',
    roundInfo:{
        fairway:[],
        score:[],
        lostBall:[],
        gir:[]
    },
    roundTotal: {
        total_fairways: 0,
        total_score: 0,
        total_lostBall: 0,
        total_gir: 0
    },
    tee: '',
    course_id: '',
    courseInfo: {},
    numOfHoles: null,
    startingHole: 1,
    goal: null,
    hole: 1,
    roundComplete: 'no'
}

const ROUND_SETUP = 'ROUND_SETUP'
const COURSE_SELECT = 'COURSE_SELCT'
const HOLE_UPDATE = 'HOLE_UPDATE'
const TOTAL_UPDATE = 'TOTAL_UPDATE'
const ROUND_REVIEW = 'ROUND_REVIEW'
const ROUND_COMPLETE = 'ROUND_COMPLETE'
const CLEAR_ROUND = 'CLEAR_ROUND'

export function courseSelect(course) {
     return {
         type: COURSE_SELECT,
         payload: course
     }
}

export function roundSetup(roundInfo) {
    return {
        type: ROUND_SETUP,
        payload: roundInfo
    }
}

export function holeUpdate(holeInfo) {
    return {
        type: HOLE_UPDATE,
        payload: holeInfo
    }
}

export function totalUpdate() {
    return {
        type:TOTAL_UPDATE
    }
}

export function roundReview(roundData) {
    return {
        type: ROUND_REVIEW,
        payload: roundData
    }
}

export function roundComplete() {
    return {
        type:ROUND_COMPLETE
    }
}

export function clearRound() {
    return {
        type: CLEAR_ROUND
    }
}

function roundReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case COURSE_SELECT:
            const {course_id} = payload
            return {...state, course_id}
        case ROUND_SETUP:
            let {round_id, tee, numOfHoles, goal, courseInfo, roundComplete, startingHole, hole} = payload
            return {...state, round_id, tee, numOfHoles, goal, courseInfo, roundComplete, startingHole, hole}
        case HOLE_UPDATE:
            const {fairway, score, lostBall, gir} = payload
            let newRoundInfo = {...state.roundInfo}
            newRoundInfo.fairway.push(fairway)
            newRoundInfo.score.push(score)
            newRoundInfo.gir.push(gir)
            newRoundInfo.lostBall.push(lostBall)
            return {
                ...state,
                roundInfo: {...newRoundInfo} ,
                hole: ++state.hole
            }
        case TOTAL_UPDATE:
            let roundData = {...state.roundInfo}
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
                    return roundTotal
                } else {
                    return 0
                }
            }
            let fairwayTotal = stringReduce('fairway')
            let girTotal = stringReduce('gir')
            let lostBallTotal = stringReduce('lostBall')
            let scoreTotal = roundData.score.reduce((total, num) => {
                return total + num
            })
            let roundTotal = {
                total_fairways: fairwayTotal.yes,
                total_gir: girTotal.yes,
                total_lostball: lostBallTotal.yes,
                total_score: scoreTotal
            }
            axios.put('/round/addRoundTotals',roundTotal)
            return {
                ...state,
                roundTotal
            }
        case ROUND_REVIEW:
            // let roundInfo = {fairway:roundInfo.fairway, score:roundInfo.score, gir:roundInfo.gir, lostBall:roundInfo.lostBall}
            let info = {
                ...state,
                roundTotal:{
                    total_fairways: payload.total_fairways,
                    total_lostball: payload.total_lostball,
                    total_gir: payload.total_gir,
                    total_score: payload.total_score

                },
                roundInfo: payload.roundInfo,
                course_id: payload.course_id,
                round_id: payload.round_id,
                goal: payload.goal,
                numOfHoles: payload.numofholes,
                tee: payload.tee,
                roundComplete: payload.roundComplete,
                courseInfo: payload.courseInfo,
                coursename: payload.coursename,
                city: payload.city,
                hole: payload.hole
            }
            return info
        case ROUND_COMPLETE:
            return {...state, roundComplete:'yes'}
        case CLEAR_ROUND:
            return {...initialState}
        default: 
            return state
    }
}
export default roundReducer