import { takeLatest, all, call, put } from 'redux-saga/effects';
import LoginActions, { LoginTypes } from './actions';
import SessionActions from '../Session/actions';
import FbSessionService from '../../Service/FbSessionService';

function* loginRequest(payload) {
    try {
        const values = yield call([FbSessionService, FbSessionService.login], payload);
        yield put(SessionActions.addUser(values));
        yield put(LoginActions.loginSuccess());
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
