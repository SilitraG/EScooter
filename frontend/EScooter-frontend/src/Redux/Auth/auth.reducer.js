import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCES, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCES } from "./auth.action"

const initialState={
    jwt:null,
    error:null,
    loading:false
}

export const authReducer=(state=initialState, action)=>{
    switch(action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return {...state, loading:true, error:null}

        case LOGIN_SUCCES:
        case REGISTER_SUCCES:
            return {...state, jwt:action.payload, loading:false, error:null}

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {...state, loading:false, error:action.payload}


        default:
            return state;
    }
}