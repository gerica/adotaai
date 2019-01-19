import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appSagas from './rootSagas';
import createReducer from './rootReducers';
import { appNavigatorMiddleware } from '../Containers/Navigator/appNavigatorOpen';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    /* ------------- Redux Configuration ------------- */
    const middlewares = [];

    /* ------------- Navigation Middleware ------------ */
    middlewares.push(appNavigatorMiddleware);

    /* ------------- Saga Middleware ------------- */

    middlewares.push(sagaMiddleware);

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(createReducer(), compose(...enhancers));

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {}; // Async reducer registry

    // Run App sagas globaly
    store.runSaga(appSagas);

    return store;
}
