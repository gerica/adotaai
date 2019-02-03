import { takeLatest, all, call, put } from 'redux-saga/effects';
import PerfilActions, { PerfilTypes } from './actions';
import HomeActions from '../Home/actions';
import FbListaDoacao from '../../Service/FbListaDoacao';

function* doacaoRequest(action) {
    try {
        yield call([FbListaDoacao, FbListaDoacao.save], action.payload);
        const values = yield call([FbListaDoacao, FbListaDoacao.fetchAll]);
        yield put(HomeActions.fetchDoadoresSuccess(values));
        yield put(PerfilActions.doacaoSuccess());
    } catch (err) {
        yield put(PerfilActions.doacaoFailure(err));
    }
}

export function* watchDoacaoRequest() {
    yield takeLatest(PerfilTypes.DOACAO_REQUEST, doacaoRequest);
}

export default function* perfilSaga() {
    yield all([
        watchDoacaoRequest(),
    ]);
}
