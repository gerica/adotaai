import { takeLatest, all, call, put } from 'redux-saga/effects';
import PerfilActions, { PerfilTypes } from './actions';
import HomeActions from '../Home/actions';
import FbListaDoacaoService from '../../Service/FbListaDoacaoService';

function* doacaoRequest(action) {
    try {
        yield call([FbListaDoacaoService, FbListaDoacaoService.save], action.payload);
        const values = yield call([FbListaDoacaoService, FbListaDoacaoService.fetchAll]);
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
