import { createReducer } from 'reduxsauce';
import { PerfilTypes } from './actions';

const INITIAL_STATE = {
    loading: false,
    listaPetPorUser: null,
    error: null,
    message: null,
};

// Geral
export const success = (state = INITIAL_STATE, { message }) => ({ ...state, loading: false, message });
export const failure = (state = INITIAL_STATE, { error }) => ({ ...state, loading: false, error });

// Cadastrar doação
export const cadastroDoacaoRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });

// FETCH OS PETS
export const fetchPetPorUserRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const fetchPetPorUserSuccess = (state = INITIAL_STATE, { listaPetPorUser }) => ({ ...state, loading: false, listaPetPorUser, error: null });

// Reset
export const resetRedux = (state = INITIAL_STATE) => ({ ...state, loading: false, error: null, message: null });

const perfilReducer = createReducer(INITIAL_STATE, {
    //RESET
    [PerfilTypes.RESET_REDUX]: resetRedux,
    [PerfilTypes.SUCCESS]: success,
    [PerfilTypes.FAILURE]: failure,

    // DOACAO
    [PerfilTypes.CADASTRO_DOACAO_REQUEST]: cadastroDoacaoRequest,

    // FEATCH PETS
    [PerfilTypes.FETCH_PET_POR_USER_REQUEST]: fetchPetPorUserRequest,
    [PerfilTypes.FETCH_PET_POR_USER_SUCCESS]: fetchPetPorUserSuccess,

});

export default perfilReducer;
