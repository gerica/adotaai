/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
import { HomeTypes } from './actions';

const INITIAL_STATE = fromJS({
    loading: false,
    obj: null,
    listaDoadores: null,
    errorMessage: null,
});

export const initReducer = (state = INITIAL_STATE) => {
    console.log('está no reducer');
    return state.set('obj', { nome: 'rogerio' });
};

export const fetchDoadoresLoading = (state = INITIAL_STATE) => {
    console.log('estou no reducer');
    return state.set('loading', true);
};
export const fetchDoadoresSuccess = (state = INITIAL_STATE, { listaDoadores }) => state.set('listaDoadores', listaDoadores);
export const fetchDoadoresFailure = (state = INITIAL_STATE, { errorMessage }) => state.set('errorMessage', errorMessage);

const homeReducer = createReducer(INITIAL_STATE, {
    [HomeTypes.INIT_REDUCER]: initReducer,
    [HomeTypes.FETCH_DOADORES]: fetchDoadoresLoading,
    [HomeTypes.FETCH_DOADORES_SUCCESS]: fetchDoadoresSuccess,
    [HomeTypes.FETCH_DOADORES_FAILURE]: fetchDoadoresFailure,
});

export default homeReducer;
