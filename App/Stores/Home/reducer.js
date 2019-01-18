import { createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
import { HomeTypes } from './actions';

const INITIAL_STATE = fromJS({
    obj: null,
});

export const initReducer = (state = INITIAL_STATE) => {
    console.log('está no reducer');
    return state.set('obj', { nome: 'rogerio' });
};

const homeReducer = createReducer(INITIAL_STATE, {
    [HomeTypes.INIT_REDUCER]: initReducer,
});

export default homeReducer;
