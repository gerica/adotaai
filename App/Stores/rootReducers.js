import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import homeReducer from './Home/reducer';
import navReducer from './Navigator';
import loginReducer from './Login/reducer';
import sessionReducer from './Session/reducer';
import perfilReducer from './Perfil/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer() {
    return combineReducers({
        form: reduxFormReducer,
        home: homeReducer,
        nav: navReducer,
        login: loginReducer,
        session: sessionReducer,
        perfil: perfilReducer,
    });
}
