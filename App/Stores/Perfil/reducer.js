import { createReducer } from 'reduxsauce';
import { PerfilTypes } from './actions';

const INITIAL_STATE = {
    loading: false,
    listaDoadores: null,
};

export const doacaoRequest = (state = INITIAL_STATE) => ({ ...state, loadin: true });

export const doacaoSuccess = (state = INITIAL_STATE) => ({ ...state, loading: false });

export const doacaoFailure = (state = INITIAL_STATE, { errorMessage }) => ({ ...state, loading: false, errorMessage });


const perfilReducer = createReducer(INITIAL_STATE, {
    // DOACAO
    [PerfilTypes.FETCH_DOADORES]: doacaoRequest,
    [PerfilTypes.FETCH_DOADORES_SUCCESS]: doacaoSuccess,
    [PerfilTypes.FETCH_DOADORES_FAILURE]: doacaoFailure,

});

export default perfilReducer;
