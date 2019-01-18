import { takeEvery, all } from 'redux-saga/effects';
import { RootTypes } from '../Action/rootAction';
import * as homeSaga from '../Containers/Home/saga';

// Our worker Saga: will perform the async increment task
// eslint-disable-next-line require-yield
export function* incrementAsync() {
    console.log('está no saga');
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery(RootTypes.HOME, incrementAsync);
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([watchIncrementAsync(), homeSaga.watchTakeLatest()]);
}
