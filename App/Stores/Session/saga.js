import { takeLatest, all, call, put } from 'redux-saga/effects';
import SessionActions, { SessionTypes } from './actions';
import FbSessionService from '../../Service/FbSessionService';

function* logout() {
    try {
        yield call([FbSessionService, FbSessionService.logout]);
    } catch (err) {
        yield put(SessionActions.removeUserFailure(err));
    }
}

function* update(action) {
    try {
        const { payload } = action;
        yield call([FbSessionService, FbSessionService.update], payload);
    } catch (err) {
        yield put(SessionActions.removeUserFailure(err));
    }
}

export function* watchLogout() {
    yield takeLatest(SessionTypes.REMOVE_USER, logout);
}

export function* watchUpdateRequest() {
    yield takeLatest(SessionTypes.UPDATE_REQUEST, update);
}

export default function* sessionSaga() {
    yield all([
        watchLogout(),
    ]);
}
