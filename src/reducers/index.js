import { combineReducers } from 'redux';

import authReducer from './auth.js';
// import rooms from './rooms.js';
// import requests from './requests.js';
// import block from './block.js';

export default combineReducers({ authReducer });