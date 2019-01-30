import { takeLatest, all, call, put } from 'redux-saga/effects';
import LoginActions, { LoginTypes } from './actions';
import FbLoginService from '../../Service/FbLoginService';

function* loginRequest(payload) {
    try {
        const values = yield call([FbLoginService, FbLoginService.login], payload);
        yield put(LoginActions.loginSuccess(values));
    } catch (err) {
        yield put(LoginActions.loginFailure(err));
    }
}

export function* watchLoginRequest() {
    yield takeLatest(LoginTypes.LOGIN_REQUEST, loginRequest);
}

export default function* homeSaga() {
    yield all([
        watchLoginRequest(),
    ]);
}
