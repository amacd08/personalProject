const initialState = {
    user_id: null,
    user: {
        firstname:'',
        lastname:'',
        email: '',
        city: '',
        state: '',
        favoritecourse:''
   },
    friendlist: []
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_USER = 'CLEAR_USER'

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER,
    }
}

function userReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_USER:
            const {user_id, username, firstname, lastname, city, state, favoritecourse} = payload
            return {user_id, user:{username, firstname, lastname, city, state, favoritecourse}}
        case CLEAR_USER:
            return {...initialState}

    }
}

export default userReducer