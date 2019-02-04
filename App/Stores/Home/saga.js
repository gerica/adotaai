import { takeLatest, all, call, put, takeEvery } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import HomeActions, { HomeTypes } from './actions';
import FbListaDoacaoService from '../../Service/FbListaDoacaoService';

// eslint-disable-next-line require-yield
function* initSaga() {
    console.log('está no saga do home');
}

function* getImagemPet(payload) {
    try {
        const ref = firebase.storage().ref(payload.object.imagem);
        const response = yield call([ref, ref.getDownloadURL]);
        yield put(HomeActions.getImagemPetSuccess(payload.object.pessoaDoadora, response));
    } catch (err) {
        yield put(HomeActions.getImagemPetFailure(payload.object.pessoaDoadora, err));
    }
}

function* fetchDoadores() {
    try {
        const values = yield call([FbListaDoacaoService, FbListaDoacaoService.fetchAll]);
        yield put(HomeActions.fetchDoadoresSuccess(values));
    } catch (err) {
        yield put(HomeActions.fetchDoadoresFailure(err));
    }
}

export function* watchTakeLatest() {
    yield takeLatest(HomeTypes.INIT_REDUCER, initSaga);
}

export function* watchFetchDoadores() {
    yield takeEvery(HomeTypes.FETCH_DOADORES, fetchDoadores);
}

export function* watchgetImagemPet() {
    yield takeEvery(HomeTypes.GET_IMAGEM_PET, getImagemPet);
}

export default function* homeSaga() {
    yield all([
        watchTakeLatest(),
        watchFetchDoadores(),
        watchgetImagemPet(),
    ]);
}
