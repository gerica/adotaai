import { all } from 'redux-saga/effects';
import * as homeSaga from './Home/saga';
import * as loginSaga from './Login/saga';
import * as perfilSaga from './Perfil/saga';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        homeSaga.watchTakeLatest(),
        homeSaga.watchFetchDoadores(),
        homeSaga.watchgetImagemPet(),
        loginSaga.watchLoginRequest(),
        perfilSaga.watchDoacaoRequest(),
    ]);
}
