const initialState = {
    course_id: null,
    course_info: []
}

const UPDATE_COURSE = 'UPDATE_COURSE'

export function updateCourse(course) {
     return {
         type: UPDATE_COURSE,
         payload: course
     }
}

function courseReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_COURSE:
            const {course_id, course_info, coursename} = payload
            return {course_id, course_info}
        default: 
            return state
    }
}

export default courseReducer