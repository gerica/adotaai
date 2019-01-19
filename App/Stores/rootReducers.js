import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import homeReducer from './Home/reducer';
import navReducer from './Navigator';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer() {
    return combineReducers({
        form: reduxFormReducer,
        home: homeReducer,
        nav: navReducer,
    });
}
