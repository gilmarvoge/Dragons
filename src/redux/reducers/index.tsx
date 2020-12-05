import { combineReducers } from 'redux';
import dragons from './dragons.reducer';

export const rootReducer = combineReducers({
  dragons,
});