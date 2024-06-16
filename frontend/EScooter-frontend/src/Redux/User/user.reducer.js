import {
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE
} from "../User/user.action";

const initialState = {
    loading: false,
    user: {},
    error: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: ''
            };
        case FETCH_USER_PROFILE_FAILURE:
            return {
                loading: false,
                user: {},
                error: action.error
            };
        default:
            return state;
    }
};

export { userReducer };
