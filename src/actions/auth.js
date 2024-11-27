import * as api from '../api';
import { AUTH,SIGNUP, USER_PROFILE } from '../constants/actionTypes';

export const signin = (input, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(input);
        dispatch({ type: AUTH, data });
        console.log(data?.result?.post)
        if(data?.result?.post==='Admin')
        {
            history('/admin/chat')
        }
        else if(data?.result?.post==='User')
        {
            history('/user/chat')
        }
        location.reload()
    } catch (error) {
        throw error;
    }
}
export const userProfile = (id) => async (dispatch) => {
    try {
        
        const { data } = await api.userprofile(id);

        dispatch({ type: USER_PROFILE, payload: { data } });
    } catch (error) {
        throw error
    }
}
export const signup = (input, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(input);
        dispatch({ type: SIGNUP, data });
        history('/user/home')
    } catch (error) {
        throw error
    }
}
