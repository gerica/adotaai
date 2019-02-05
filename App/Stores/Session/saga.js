import { takeLatest, all, call, put } from 'redux-saga/effects';
import SessionActions, { SessionTypes } from './actions';
import FbSessionService from '../../Service/FbSessionService';
import GoogleSigninService from '../../Service/GoogleSigninService';

function* signOutRequest() {
    try {
        yield call([FbSessionService, FbSessionService.signOut]);
        yield call([GoogleSigninService, GoogleSigninService.signOut]);
        yield put(SessionActions.signOutSuccess());
    } catch (err) {
        console.log({ err });
        yield put(SessionActions.signOutFailure(err));
    }
}

function* update(action) {
    try {
        const { payload } = action;
        yield call([FbSessionService, FbSessionService.update], payload);
    } catch (err) {
        yield put(SessionActions.signOutFailure(err));
    }
}

function* loginRequest(payload) {
    try {
        const values = yield call([FbSessionService, FbSessionService.login], payload);
        yield put(SessionActions.addUser(values));
        yield put(SessionActions.loginSuccess());
    } catch (err) {
        yield put(SessionActions.loginFailure(err));
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
    yield takeLatest(SessionTypes.UPDATE_REQUEST, update);
}

export function* watchSignInGoogleRequest() {
    yield takeLatest(SessionTypes.SIGN_IN_GOOGLE_REQUEST, signInGoogleRequest);
}

export default function* sessionSaga() {
    yield all([
        watchLoginRequest(),
        watchSignInGoogleRequest(),
        watchSignOutRequest(),
    ]);
}
