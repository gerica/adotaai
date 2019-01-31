/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
// import Reactotron from 'reactotron-react-native';
// import { concat } from 'lodash';
import { SessionTypes } from './actions';

const INITIAL_STATE = fromJS({
    user: undefined,
});

export const addUser = (state = INITIAL_STATE, { user }) => {
    console.log('estou no reducer');
    console.log(user);
    console.log('---------');
    return state.set('user', user);
};
export const removeUser = (state = INITIAL_STATE) => state.set('user', null);

const sessionReducer = createReducer(INITIAL_STATE, {
    [SessionTypes.ADD_USER]: addUser,
    [SessionTypes.REMOVE_USER]: removeUser,
});

export default sessionReducer;
