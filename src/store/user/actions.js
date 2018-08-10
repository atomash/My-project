import axios from 'axios';
import * as types from './types';
import PromiseThunk from '../createPromiseThunk'; 

export const fetchUser = PromiseThunk(
    types.GET_USER, () => {
        return axios.get(`/api/user`)
    }
);
