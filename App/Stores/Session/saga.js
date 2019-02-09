import { takeLatest, all, call, put } from 'redux-saga/effects';
import SessionActions, { SessionTypes } from './actions';
import FbSessionService from '../../Service/FbSessionService';
import GoogleSigninService from '../../Service/GoogleSigninService';
import { MSG_001 } from '../../Utils/constants';

function* signOutRequest() {
    try {
        yield call([FbSessionService, FbSessionService.signOut]);
        yield call([GoogleSigninService, GoogleSigninService.signOut]);
        yield put(SessionActions.signOutSuccess());
    } catch (err) {
        yield put(SessionActions.signOutFailure(err));
    }
}

/**
 * Alterar informações do usuário
 * @param {usuario} action 
 */
function* updateRequest({ payload }) {
    try {
        yield call([FbSessionService, FbSessionService.update], payload);
        const values = yield call([FbSessionService, FbSessionService.refresh]);
        yield put(SessionActions.addUser(values));
        yield put(SessionActions.success(MSG_001));
    } catch (err) {
        yield put(SessionActions.failure(err));
    }
}

function* loginRequest(payload) {
    try {
        const values = yield call([FbSessionService, FbSessionService.login], payload);
        yield put(SessionActions.addUser(values));
        yield put(SessionActions.success());
    } catch (err) {
        yield put(SessionActions.failure(err));
    }
}

function* signInGoogleRequest() {
    try {
        const values = yield call([GoogleSigninService, GoogleSigninService.signIn]);
        yield put(SessionActions.addUser(values));
        yield put(SessionActions.signInGoogleSuccess());
    } catch (err) {
        yield put(SessionActions.loginFailure(err));
    }
}

export function* watchLoginRequest() {
    yield takeLatest(SessionTypes.LOGIN_REQUEST, loginRequest);
}

export function* watchSignOutRequest() {
    yield takeLatest(SessionTypes.SIGN_OUT_REQUEST, signOutRequest);
}

export function* watchUpdateRequest() {
    yield takeLatest(SessionTypes.UPDATE_REQUEST, updateRequest);
}

export function* watchSignInGoogleRequest() {
    yield takeLatest(SessionTypes.SIGN_IN_GOOGLE_REQUEST, signInGoogleRequest);
}

export default function* sessionSaga() {
    yield all([
        watchLoginRequest(),
        watchSignInGoogleRequest(),
        watchSignOutRequest(),
        watchUpdateRequest(),
    ]);
}
