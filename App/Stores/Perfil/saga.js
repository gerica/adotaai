import { takeLatest, all, call, put } from 'redux-saga/effects';
import PerfilActions, { PerfilTypes } from './actions';
import FbListaDoacao from '../../Service/FbListaDoacao';

function* doacaoRequest(action) {
    try {
        yield call([FbListaDoacao, FbListaDoacao.save], action.payload);
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
