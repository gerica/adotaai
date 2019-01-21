import { takeLatest, all, call, put } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import HomeActions, { HomeTypes } from './actions';

// eslint-disable-next-line require-yield
function* initSaga() {
    console.log('está no saga do home');
}

function* getImagemPet(payload) {
    try {
        const ref = firebase.storage().ref(payload.filePath);
        const response = yield call([ref, ref.getDownloadURL]);
        yield put(HomeActions.getImagemPetSuccess(payload.filePath, response));
    } catch (err) {
        yield put(HomeActions.getImagemPetFailure(err));
    }
}

function* fetchDoadores() {
    try {
        const ref = firebase.database().ref('listaDoacao/');

        const snap = yield call([ref, ref.once], 'value');
        const val = snap.val();
        const values = val || {};
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

export function* watchgetImagemPet() {
    yield takeLatest(HomeTypes.GET_IMAGEM_PET, getImagemPet);
}

export default function* homeSaga() {
    yield all([
        watchTakeLatest(),
        watchFetchDoadores(),
        watchgetImagemPet(),
    ]);
}
