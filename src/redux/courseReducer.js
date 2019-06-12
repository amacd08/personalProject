const initialState = {
    courseList: [],
}

const UPDATE_COURSE = 'UPDATE_COURSE'
const CREATE_COURSE_LIST = 'CREATE_COURSE_LIST'

export function updateCourse(course) {
     return {
         type: UPDATE_COURSE,
         payload: course
     }
}

export function createCourseList(courseList) {
    return {
        type: CREATE_COURSE_LIST,
        payload: courseList
    }
}

function courseReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_COURSE:
            const {course_id, course_info} = payload
            return {course_id, course_info}
        case CREATE_COURSE_LIST:
            return {...state, courseList: payload}
        default: 
            return state    
    }
}

export default courseReducer