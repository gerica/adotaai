import { applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import appSagas from './rootSagas';
import createReducer from './rootReducers';
import { appNavigatorMiddleware } from '../Containers/Navigator';
import { reactotron } from '../App';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['nav', 'form'],
    stateReconciler: autoMergeLevel2
};

export default function configureStore() {
    /* ------------- Redux Configuration ------------- */
    const middlewares = [];

    /* ------------- Navigation Middleware ------------ */
    middlewares.push(appNavigatorMiddleware);

    /* ------------- Saga Middleware ------------- */

    middlewares.push(sagaMiddleware);

    const enhancers = [applyMiddleware(...middlewares)];

    // Redux persist
    const persistedReducer = persistReducer(persistConfig, createReducer());

    const store = reactotron.createStore(persistedReducer, compose(...enhancers));
    const persistor = persistStore(store);

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {}; // Async reducer registry

    // Run App sagas globaly
    store.runSaga(appSagas);

    return { store, persistor };
}
