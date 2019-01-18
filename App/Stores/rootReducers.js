import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import homeReducer from './Home/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer() {
    return combineReducers({
        form: reduxFormReducer,
        homeReducer,
    });
}