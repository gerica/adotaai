import { createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
import { StartupTypes } from './actions';

const INITIAL_STATE = fromJS({
    obj: null,
});

const metodoTeste = (state) => {
    console.log('está no reducer');
    return state.set('obj', { nome: 'rogerio' });
};

export const reducer = createReducer(INITIAL_STATE, {
    [StartupTypes.STARTUP]: metodoTeste,
});

