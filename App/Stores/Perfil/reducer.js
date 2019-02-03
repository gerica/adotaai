import { createReducer } from 'reduxsauce';
import { PerfilTypes } from './actions';

const INITIAL_STATE = {
    loading: false,
    listaDoadores: null,
    errorMessage: null,
    message: null,
};

export const doacaoRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });

export const doacaoSuccess = (state = INITIAL_STATE) => ({ ...state, loading: false, message: 'Operação realizada com sucesso.' });

export const doacaoFailure = (state = INITIAL_STATE, { errorMessage }) => ({ ...state, loading: false, errorMessage });

export const resetRedux = (state = INITIAL_STATE) => ({ ...state, loading: false, errorMessage: null, message: null });

const perfilReducer = createReducer(INITIAL_STATE, {
    // DOACAO
    [PerfilTypes.DOACAO_REQUEST]: doacaoRequest,
    [PerfilTypes.DOACAO_SUCCESS]: doacaoSuccess,
    [PerfilTypes.DOACAO_FAILURE]: doacaoFailure,
    [PerfilTypes.RESET_REDUX]: resetRedux,

});

export default perfilReducer;
