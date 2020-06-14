import {SIGN_IN} from '../actions/actions'

const initialState = {
    login:false,
    loading:false,
    idToken:null,
    userId:null
}

const reducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type) {
        case SIGN_IN.START: {
            return {
                ...state,
                loading:true
            }
        }
        case SIGN_IN.COMPLETED: {
            return {
                ...state,
                login:true,
                loading:false,
                idToken: action.idToken,
                userId: action.userId,
                error: null
            }
        }
        case SIGN_IN.FAILURE: {
            return {
                ...state,
                login:false,
                loading:false,
                error: action.error
            }
        }
        default: return state
    }
}

export default reducer;