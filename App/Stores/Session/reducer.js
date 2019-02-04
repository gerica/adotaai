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

export const addUser = (state = INITIAL_STATE, { user }) => ({ ...state, user });
export const removeUser = (state = INITIAL_STATE) => ({ ...state, user: null });
export const removeUserFailure = (state = INITIAL_STATE, { errorMessage }) => ({ ...state, user: null, errorMessage });
export const updateRequest = (state = INITIAL_STATE) => ({ ...state, user: null, loading: true });

const sessionReducer = createReducer(INITIAL_STATE, {
    [SessionTypes.ADD_USER]: addUser,
    [SessionTypes.REMOVE_USER]: removeUser,
    [SessionTypes.REMOVE_USER_FAILURE]: removeUserFailure,
    [SessionTypes.UPDATE_REQUEST]: updateRequest,
});

export default sessionReducer;
