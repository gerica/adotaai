/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appSagas from './rootSagas';
import createReducer from './rootReducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(createReducer(), compose(...enhancers));

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {}; // Async reducer registry

    // Run App sagas globaly
    store.runSaga(appSagas);

    return store;
}
