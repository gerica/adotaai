import { takeLatest, all } from 'redux-saga/effects';
import { HomeTypes } from './actions';

// eslint-disable-next-line require-yield
function* initSaga() {
    console.log('está no saga do home');
}

export function* watchTakeLatest() {
    yield takeLatest(HomeTypes.INIT_REDUCER, initSaga);
}

export default function* homeSaga() {
    yield all([watchTakeLatest()]);
}
