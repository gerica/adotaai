/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
// import { fromJS } from 'immutable';
// import Reactotron from 'reactotron-react-native';
// import { concat } from 'lodash';
import { SessionTypes } from './actions';

const INITIAL_STATE = {
    user: undefined,
    errorMessage: undefined,
    loading: false,
};

// Login
export const loginRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const loginSuccess = (state = INITIAL_STATE) => ({ ...state, loading: false, errorMessage: null });
export const loginFailure = (state = INITIAL_STATE, payload) => ({ ...state, errorMessage: payload.error, loading: false });

//Signing google
export const signInGoogleRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const signInGoogleSuccess = (state = INITIAL_STATE) => ({ ...state, loading: false, errorMessage: null });
export const signInGoogleFailure = (state = INITIAL_STATE, { errorMessage }) => ({ ...state, loading: false, errorMessage });

// adicionar usuário
export const addUser = (state = INITIAL_STATE, { user }) => ({ ...state, user });

// SignOut
export const signOutRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const signOutSuccess = (state = INITIAL_STATE) => ({ ...state, loading: false, user: null });
export const signOutFailure = (state = INITIAL_STATE, { errorMessage }) => ({ ...state, user: null, errorMessage, loading: false });

export const resetRedux = (state = INITIAL_STATE) => ({ ...state, loading: false, errorMessage: null, message: null });

//Atualizar
export const updateRequest = (state = INITIAL_STATE) => ({ ...state, user: null, loading: true });

const sessionReducer = createReducer(INITIAL_STATE, {
    // LOGIN
    [SessionTypes.LOGIN_REQUEST]: loginRequest,
    [SessionTypes.LOGIN_SUCCESS]: loginSuccess,
    [SessionTypes.LOGIN_FAILURE]: loginFailure,

    // SIGNIG GOOGLE
    [SessionTypes.SIGN_IN_GOOGLE_REQUEST]: signInGoogleRequest,
    [SessionTypes.SIGN_IN_GOOGLE_SUCCESS]: signInGoogleSuccess,
    [SessionTypes.SIGN_IN_GOOGLE_FAILURE]: signInGoogleFailure,

    // adicionar usuário
    [SessionTypes.ADD_USER]: addUser,

    // SignOut
    [SessionTypes.SIGN_OUT_REQUEST]: signOutRequest,
    [SessionTypes.SIGN_OUT_SUCCESS]: signOutSuccess,
    [SessionTypes.SIGN_OUT_FAILURE]: signOutFailure,

    // atualizar
    [SessionTypes.UPDATE_REQUEST]: updateRequest,

    [SessionTypes.RESET_REDUX]: resetRedux,

});

export default sessionReducer;
