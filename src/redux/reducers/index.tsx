import { combineReducers } from 'redux';
import books from './books.reducer';

export const rootReducer = combineReducers({
  books,
});