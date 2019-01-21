/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
import { concat } from 'lodash';
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

export const fetchDoadoresLoading = (state = INITIAL_STATE) => state.set('loading', true);
export const fetchDoadoresSuccess = (state = INITIAL_STATE, { listaDoadores }) =>
    state.set('listaDoadores', listaDoadores)
        .set('loading', false);
export const fetchDoadoresFailure = (state = INITIAL_STATE, { errorMessage }) => state.set('errorMessage', errorMessage);

export const getImagemPetLoading = (state = INITIAL_STATE) => state.set('loading', true);
export const getImagemPetSuccess = (state = INITIAL_STATE, { key, imagemPet }) => {
    const temp = [];
    temp.push({ key, img: imagemPet });
    const oldList = state.get('imagemPet');
    let newList = temp;
    if (oldList) {
        newList = concat([], oldList, temp);
    }
    return state.set('imagemPet', newList)
        .set('loading', false);
};
export const getImagemPetFailure = (state = INITIAL_STATE, { errorMessage }) => state.set('errorMessage', errorMessage);

const homeReducer = createReducer(INITIAL_STATE, {
    [HomeTypes.INIT_REDUCER]: initReducer,
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
