const initialState = {
    round_id: [],
    tee: [],
    course_id: [],
    course_info: []
}


const UPDATE_COURSE = 'UPDATE_COURSE'
const NEW_ROUND = 'NEW_ROUND'

export function newRound(round) {
     return {
         type: NEW_ROUND,
         payload: round
     }
}

function roundReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case NEW_ROUND:
            const {course_id, course_info, round_id, tee, numOfHoles} = payload
            return {course_id, course_info, round_id, tee, numOfHoles}
        default: 
            return state
    }
}

export default roundReducer