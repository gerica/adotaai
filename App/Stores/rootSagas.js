import { all } from 'redux-saga/effects';
import * as homeSaga from './Home/saga';
import * as petSaga from './Pet/saga';
import * as sessionSaga from './Session/saga';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        homeSaga.watchFetchDoadoresRequest(),
        homeSaga.watchgetImagemPet(),

        petSaga.watchCadastroDoacaoRequest(),
        petSaga.watchFetchPetPorUserRequest(),

        sessionSaga.watchLoginRequest(),
        sessionSaga.watchSignInGoogleRequest(),
        sessionSaga.watchSignOutRequest(),
        sessionSaga.watchUpdateRequest(),
    ]);
}
