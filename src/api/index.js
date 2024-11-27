import axios from "axios";

const API = axios.create({ baseURL: "http://18.205.22.41/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})


export const signIn = (formData) => API.post('user/signin', formData);
export const signUp = (formData) => API.post('user/signup', formData);
export const userprofile = (id) => API.get(`/user/profile/${id}`);
