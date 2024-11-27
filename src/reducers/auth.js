import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null, userData: [],notifications:null,getusers:null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data, loading: false, errors: null };

        case actionType.SIGNUP:
            //localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };

        case actionType.USER_PROFILE:
            return { ...state, userData: action.payload.data, loading: false, errors: null }


        default:
            return state;
    }
};

export default authReducer;