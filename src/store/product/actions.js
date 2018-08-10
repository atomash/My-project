import axios from 'axios';
import * as types from './types';
import PromiseThunk from '../createPromiseThunk';

export const fetchProduct = PromiseThunk(
    types.GET_PRODUCT, () => axios.get(`/api/product`)
);