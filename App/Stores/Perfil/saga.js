import { takeLatest, all, call, put } from 'redux-saga/effects';
import PerfilActions, { PerfilTypes } from './actions';
import HomeActions from '../Home/actions';
import FbListaDoacaoService from '../../Service/FbListaDoacaoService';

/**
 * Adicionar uma doação
 * @param {pet para doação} action 
 */
function* doacaoRequest(action) {
    try {
        yield call([FbListaDoacaoService, FbListaDoacaoService.save], action.payload);
        const values = yield call([FbListaDoacaoService, FbListaDoacaoService.fetchAll]);
        yield put(HomeActions.fetchDoadoresAbertoSuccess(values));
        yield put(PerfilActions.doacaoSuccess());
    } catch (err) {
        yield put(PerfilActions.doacaoFailure(err));
    }
}

/**
 * Recuperar pet por usuário
 * @param {user} param0 
 */
function* fetchPetPorUserRequest({ user }) {
    try {
        const values = yield call([FbListaDoacaoService, FbListaDoacaoService.fetchByUser], user);
        yield put(PerfilActions.fetchPetPorUserSuccess(values));
    } catch (err) {
        yield put(PerfilActions.fetchPetPorUserFailure(err));
    }
}

export function* watchDoacaoRequest() {
    yield takeLatest(PerfilTypes.DOACAO_REQUEST, doacaoRequest);
}

export function* watchFetchPetPorUserRequest() {
    yield takeLatest(PerfilTypes.FETCH_PET_POR_USER_REQUEST, fetchPetPorUserRequest);
}


export default function* perfilSaga() {
    yield all([
        watchDoacaoRequest(),
        watchFetchPetPorUserRequest(),
    ]);
}
