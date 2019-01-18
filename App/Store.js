import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './Saga/rootSaga';
import rootReducer from './Reducer/rootReducer';

const sagaMiddleware = createSagaMiddleware(...rootSaga);
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run();

export default store;
