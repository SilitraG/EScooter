import api from '../../config/api';

export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

export const fetchUserProfile = (username) => async (dispatch) => {
    dispatch({ type: FETCH_USER_PROFILE_REQUEST });
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        console.log(`Sending request to /user/${username} with token`, token);
        const response = await api.get(`/user/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("API response:", response.data); // Verifică răspunsul API
        dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        console.error("API error:", error); // Verifică eroarea API
        if (error.response && error.response.data) {
            dispatch({ type: FETCH_USER_PROFILE_FAILURE, error: error.response.data });
        } else {
            dispatch({ type: FETCH_USER_PROFILE_FAILURE, error: error.message });
        }
    }
};
