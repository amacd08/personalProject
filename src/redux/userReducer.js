const initialState = {
    user_id: null,
    user: {
        firstname:'',
        lastname:'',
        email: '',
        city: '',
        st: '',
        favoritecourse:''
   },
    friendlist: [],
    loggedIn: false
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
    console.log('hitting function')
    return {
        type: CLEAR_USER,
    }
}

function userReducer(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case UPDATE_USER:
            const {user_id, username, firstname, lastname, city, st, favoritecourse} = payload
            return {...state, user_id, user:{username, firstname, lastname, city, st, favoritecourse}, loggedIn:true}
        case CLEAR_USER:
            console.log('hitting case')
            return {...initialState}
		default:
			return state
	}
}


export default userReducer