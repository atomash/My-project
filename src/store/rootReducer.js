import { combineReducers } from "redux";
import { ProductReducer } from './product/reducers';
import {  UserReduser } from './user/reducers';

const rootReducer = combineReducers({
  pr: ProductReducer,
  ur: UserReduser
});

export default rootReducer;