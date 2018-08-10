import * as types from './types';

export function ProductReducer(state={product: {}}, action){
  switch(action.type){
      case `${types.GET_PRODUCT}_COMPLETED`:
          return {
              product: action.payload.data
          };
      default:
          return state;
  }
}