import * as types from './types';

export function UserReduser(state={user:{}}, action){
    switch(action.type){
        case `${types.GET_USER}_START`:
            return {
                user: {},
                loading: true,
            };
        case `${types.GET_USER}_COMPLETED`:
            return {
                user: action.payload.data,
                loading: false
            };  
        default:
            return state;
    }
}