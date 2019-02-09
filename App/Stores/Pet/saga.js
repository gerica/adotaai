import { takeLatest, all, call, put } from 'redux-saga/effects';
import PerfilActions, { PerfilTypes } from './actions';
import HomeActions from '../Home/actions';
import FbListaDoacaoService from '../../Service/FbListaDoacaoService';

/**
 * Adicionar uma doação
 * @param {pet para doação} action 
 */
function* cadastroDoacaoRequest(action) {
    try {
        yield call([FbListaDoacaoService, FbListaDoacaoService.save], action.payload);
        const values = yield call([FbListaDoacaoService, FbListaDoacaoService.fetchAll]);
        yield put(HomeActions.fetchDoadoresAbertoSuccess(values));
        yield put(PerfilActions.success());
    } catch (err) {
        yield put(PerfilActions.failure(err));
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
        yield put(PerfilActions.failure(err));
    }
}

export function* watchCadastroDoacaoRequest() {
    yield takeLatest(PerfilTypes.CADASTRO_DOACAO_REQUEST, cadastroDoacaoRequest);
}

export function* watchFetchPetPorUserRequest() {
    yield takeLatest(PerfilTypes.FETCH_PET_POR_USER_REQUEST, fetchPetPorUserRequest);
}


export default function* perfilSaga() {
    yield all([
        watchCadastroDoacaoRequest(),
        watchFetchPetPorUserRequest(),
    ]);
}
