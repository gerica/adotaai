import { combineReducers } from 'redux';
import { Map } from 'immutable';
import { createReducer } from 'reduxsauce';
import { RootTypes } from '../Action/rootAction';
import { reducer as homeReducer } from '../Containers/Home/reducer';

const INITIAL_STATE = Map({
    obj: null,
});

export const home = (state) =>
    state.merge({
        obj: null,
    });

const localReducer = createReducer(INITIAL_STATE, {
    [RootTypes.HOME]: home,
});

const rootReducer = combineReducers({
    localReducer,
    homeReducer,
    // home: homeReducer,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
