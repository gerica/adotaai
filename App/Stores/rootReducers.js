import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import navReducer from './Navigator';
import sessionReducer from './Session/reducer';
import petReducer from './Pet/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer() {
    return combineReducers({
        form: reduxFormReducer,
        nav: navReducer,
        session: sessionReducer,
        pet: petReducer,
    });
}
