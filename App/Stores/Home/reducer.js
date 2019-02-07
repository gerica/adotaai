/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
// import { fromJS } from 'immutable';
// import Reactotron from 'reactotron-react-native';
// import { concat } from 'lodash';
import { HomeTypes } from './actions';

const INITIAL_STATE = {
    loading: false,
    listaDoadoresAberto: null,
    errorMessage: null,
    imagemPet: null,
};

export const changeLoading = (state = INITIAL_STATE, { loading }) => state.set('loading', loading);

export const fetchDoadoresAbertoRequest = (state = INITIAL_STATE) => ({ ...state, loadin: true });

export const fetchDoadoresAbertoSuccess = (state = INITIAL_STATE, { listaDoadoresAberto }) => ({ ...state, listaDoadoresAberto, loading: false });

export const fetchDoadoresAbertoFailure = (state = INITIAL_STATE, { errorMessage }) => ({ ...state, errorMessage });

export const getImagemPetLoading = (state = INITIAL_STATE) => state;

export const getImagemPetSuccess = (state = INITIAL_STATE, { key, imagemPet }) => {
    // const indexOfListToUpdate = state.get('listaDoadoresAberto').findIndex(e => e.pessoaDoadora === key);
    // return state.setIn(['listaDoadoresAberto', indexOfListToUpdate, 'imagemUrl'], imagemPet);
    // return state;
    const listaDoadoresAberto = state.get('listaDoadoresAberto').slice();
    const indexOfListToUpdate = listaDoadoresAberto.findIndex(e => e.pessoaDoadora === key);
    listaDoadoresAberto[indexOfListToUpdate].imagemUrl = imagemPet;
    return state.set('listaDoadoresAberto', listaDoadoresAberto);
};

export const getImagemPetFailure = (state = INITIAL_STATE, { key, errorMessage }) => {
    const listaDoadoresAberto = state.get('listaDoadoresAberto').slice();
    const indexOfListToUpdate = listaDoadoresAberto.findIndex(e => e.pessoaDoadora === key);
    listaDoadoresAberto[indexOfListToUpdate].imagemUrl = 'não encontrado';
    return state.set('errorMessage', errorMessage).set('listaDoadoresAberto', listaDoadoresAberto);
};

export const reset = (state = INITIAL_STATE) => ({ ...state, errorMessage: null, loading: false });

const homeReducer = createReducer(INITIAL_STATE, {
    [HomeTypes.CHANGE_LOADING]: changeLoading,
    // LISTA DE DOADORES
    [HomeTypes.FETCH_DOADORES_ABERTO_REQUEST]: fetchDoadoresAbertoRequest,
    [HomeTypes.FETCH_DOADORES_ABERTO_SUCCESS]: fetchDoadoresAbertoSuccess,
    [HomeTypes.FETCH_DOADORES_ABERTO_FAILURE]: fetchDoadoresAbertoFailure,
    // RECUPAR IMAGENM
    [HomeTypes.GET_IMAGEM_PET]: getImagemPetLoading,
    [HomeTypes.GET_IMAGEM_PET_SUCCESS]: getImagemPetSuccess,
    [HomeTypes.GET_IMAGEM_PET_FAILURE]: getImagemPetFailure,
    // RESET
    [HomeTypes.RESET]: reset,

});

export default homeReducer;
