/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
// import Reactotron from 'reactotron-react-native';
// import { concat } from 'lodash';
import { HomeTypes } from './actions';

const INITIAL_STATE = fromJS({
    loading: false,
    listaDoadores: null,
    errorMessage: null,
    imagemPet: null,
});

export const initReducer = (state = INITIAL_STATE) => {
    console.log('está no reducer');
    return state.set('obj', { nome: 'rogerio' });
};

export const changeLoading = (state = INITIAL_STATE, { loading }) => state.set('loading', loading);

export const fetchDoadoresLoading = (state = INITIAL_STATE) => state.set('loading', true);

export const fetchDoadoresSuccess = (state = INITIAL_STATE, { listaDoadores }) =>
    state.set('listaDoadores', listaDoadores).set('loading', false);
export const fetchDoadoresFailure = (state = INITIAL_STATE, { errorMessage }) => state.set('errorMessage', errorMessage);

export const getImagemPetLoading = (state = INITIAL_STATE) => state;

export const getImagemPetSuccess = (state = INITIAL_STATE, { key, imagemPet }) => {
    // const indexOfListToUpdate = state.get('listaDoadores').findIndex(e => e.pessoaDoadora === key);
    // return state.setIn(['listaDoadores', indexOfListToUpdate, 'imagemUrl'], imagemPet);
    // return state;
    const listaDoadores = state.get('listaDoadores').slice();
    const indexOfListToUpdate = listaDoadores.findIndex(e => e.pessoaDoadora === key);
    listaDoadores[indexOfListToUpdate].imagemUrl = imagemPet;
    return state.set('listaDoadores', listaDoadores);
};

export const getImagemPetFailure = (state = INITIAL_STATE, { key, errorMessage }) => {
    const listaDoadores = state.get('listaDoadores').slice();
    const indexOfListToUpdate = listaDoadores.findIndex(e => e.pessoaDoadora === key);
    listaDoadores[indexOfListToUpdate].imagemUrl = 'não encontrado';
    return state.set('errorMessage', errorMessage).set('listaDoadores', listaDoadores);
};

const homeReducer = createReducer(INITIAL_STATE, {
    [HomeTypes.INIT_REDUCER]: initReducer,
    [HomeTypes.CHANGE_LOADING]: changeLoading,
    // LISTA DE DOADORES
    [HomeTypes.FETCH_DOADORES]: fetchDoadoresLoading,
    [HomeTypes.FETCH_DOADORES_SUCCESS]: fetchDoadoresSuccess,
    [HomeTypes.FETCH_DOADORES_FAILURE]: fetchDoadoresFailure,
    // RECUPAR IMAGENM
    [HomeTypes.GET_IMAGEM_PET]: getImagemPetLoading,
    [HomeTypes.GET_IMAGEM_PET_SUCCESS]: getImagemPetSuccess,
    [HomeTypes.GET_IMAGEM_PET_FAILURE]: getImagemPetFailure,

});

export default homeReducer;
