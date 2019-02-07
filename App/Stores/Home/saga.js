import { takeLatest, all, call, put, takeEvery } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import HomeActions, { HomeTypes } from './actions';
import FbListaDoacaoService from '../../Service/FbListaDoacaoService';

function* getImagemPet(payload) {
    try {
        const ref = firebase.storage().ref(payload.object.imagem);
        const response = yield call([ref, ref.getDownloadURL]);
        yield put(HomeActions.getImagemPetSuccess(payload.object.pessoaDoadora, response));
    } catch (err) {
        yield put(HomeActions.getImagemPetFailure(payload.object.pessoaDoadora, err));
    }
}

function* fetchDoadoresRequest() {
    try {
        const values = yield call([FbListaDoacaoService, FbListaDoacaoService.fetchAll]);
        yield put(HomeActions.fetchDoadoresAbertoSuccess(values));
    } catch (err) {
        yield put(HomeActions.fetchDoadoresAbertoFailure(err));
    }
}

export function* watchFetchDoadoresRequest() {
    yield takeLatest(HomeTypes.FETCH_DOADORES_ABERTO_REQUEST, fetchDoadoresRequest);
}

export function* watchgetImagemPet() {
    yield takeEvery(HomeTypes.GET_IMAGEM_PET, getImagemPet);
}

export default function* homeSaga() {
    yield all([
        watchFetchDoadoresRequest(),
        watchgetImagemPet(),
    ]);
}
