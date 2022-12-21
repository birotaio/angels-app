import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth/reducer';
import map from './map/reducer';

export default combineReducers({auth, map});
