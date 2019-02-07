import { createReducer } from 'reduxsauce';
import { PerfilTypes } from './actions';

const INITIAL_STATE = {
    loading: false,
    listaPetPorUser: null,
    errorMessage: null,
    message: null,
};

//CADASTRAR UMA DOAÇÃO
export const doacaoRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const doacaoSuccess = (state = INITIAL_STATE) => ({ ...state, loading: false, message: 'Operação realizada com sucesso.' });
export const doacaoFailure = (state = INITIAL_STATE, { errorMessage }) => ({ ...state, loading: false, errorMessage });

// FETCH OS PETS
export const fetchPetPorUserRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const fetchPetPorUserSuccess = (state = INITIAL_STATE, { listaPetPorUser }) => ({ ...state, loading: false, listaPetPorUser, errorMessage: null });
export const fetchPetPorUserFailure = (state = INITIAL_STATE, { errorMessage }) => ({ ...state, loading: false, errorMessage });

export const resetRedux = (state = INITIAL_STATE) => ({ ...state, loading: false, errorMessage: null, message: null });

const perfilReducer = createReducer(INITIAL_STATE, {
    // DOACAO
    [PerfilTypes.DOACAO_REQUEST]: doacaoRequest,
    [PerfilTypes.DOACAO_SUCCESS]: doacaoSuccess,
    [PerfilTypes.DOACAO_FAILURE]: doacaoFailure,

    //RESET
    [PerfilTypes.RESET_REDUX]: resetRedux,

    // FEATCH PETS
    [PerfilTypes.FETCH_PET_POR_USER_REQUEST]: fetchPetPorUserRequest,
    [PerfilTypes.FETCH_PET_POR_USER_SUCCESS]: fetchPetPorUserSuccess,
    [PerfilTypes.FETCH_PET_POR_USER_FAILURE]: fetchPetPorUserFailure,

});

export default perfilReducer;
