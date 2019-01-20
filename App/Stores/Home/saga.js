import { takeLatest, all, call, put } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import HomeActions, { HomeTypes } from './actions';

// eslint-disable-next-line require-yield
function* initSaga() {
    console.log('está no saga do home');
}

function* fetchDoadores() {
    try {
        console.log('saga fecth doadores...');
        const ref = firebase.database().ref('listaDoacao/');

        const snap = yield call([ref, ref.once], 'value');
        const val = snap.val();
        const values = val || {};
        console.log(values);
        yield put(HomeActions.fetchDoadoresSuccess(values));
    } catch (err) {
        yield put(HomeActions.fetchDoadoresFailure(err));
    }
}

export function* watchTakeLatest() {
    yield takeLatest(HomeTypes.INIT_REDUCER, initSaga);
}

export function* watchFetchDoadores() {
    yield takeLatest(HomeTypes.FETCH_DOADORES, fetchDoadores);
}

export default function* homeSaga() {
    yield all([
        watchTakeLatest(),
        watchFetchDoadores(),
    ]);
}
