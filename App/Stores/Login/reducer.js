/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
// import Reactotron from 'reactotron-react-native';
// import { concat } from 'lodash';
import { LoginTypes } from './actions';

const INITIAL_STATE = fromJS({
    loading: false,
    usuario: null,
    errorMessage: null,
});

export const loginRequest = (state = INITIAL_STATE) => state.set('loading', true);

export const loginSuccess = (state = INITIAL_STATE, { usuario }) => state.set('usuario', usuario).set('loading', false).set('errorMessage', null);

export const loginFailure = (state = INITIAL_STATE, payload) => state.set('errorMessage', payload.error).set('loading', false);

const loginReducer = createReducer(INITIAL_STATE, {
    // LOGIN
    [LoginTypes.LOGIN_REQUEST]: loginRequest,
    [LoginTypes.LOGIN_SUCCESS]: loginSuccess,
    [LoginTypes.LOGIN_FAILURE]: loginFailure,

});

export default loginReducer;
