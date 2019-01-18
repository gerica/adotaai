import { takeLatest, all } from 'redux-saga/effects';
import { StartupTypes } from './actions';

// eslint-disable-next-line require-yield
function* hello() {
    console.log('está no saga do home');
}

export function* watchTakeLatest() {
    yield takeLatest(StartupTypes.STARTUP, hello);
}

export default function* homeSaga() {
    yield all([watchTakeLatest()]);
}
