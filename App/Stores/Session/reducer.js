/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
// import { fromJS } from 'immutable';
// import Reactotron from 'reactotron-react-native';
// import { concat } from 'lodash';
import { SessionTypes } from './actions';

const INITIAL_STATE = {
    user: undefined,
};

export const addUser = (state = INITIAL_STATE, { user }) => ({ ...state, user });
export const removeUser = (state = INITIAL_STATE) => ({ ...state, user: null });

const sessionReducer = createReducer(INITIAL_STATE, {
    [SessionTypes.ADD_USER]: addUser,
    [SessionTypes.REMOVE_USER]: removeUser,
});

export default sessionReducer;
