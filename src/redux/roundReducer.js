const initialState = {
    round_id: '',
    roundInfo:{
        fairway:[],
        score:[],
        lostBall:[],
        gir:[]
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

function roundReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case COURSE_SELECT:
            const {course_id} = payload
            return {...state, course_id}
        case ROUND_SETUP:
            const {round_id, tee, numOfHoles, goal, courseInfo, roundComplete, startingHole, hole} = payload
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
        default: 
            return state
    }
}
export default roundReducer