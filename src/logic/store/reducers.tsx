import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth/reducer';
import map from './map/reducer';
import app from './app/reducer';

export default combineReducers({auth, map, app});
