import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({

    //Geral
    resetRedux: [],
    request: ['payload'],
    success: ['message'],
    failure: ['error'],

    loginRequest: ['email', 'password'],
    loginSuccess: [],
    loginFailure: ['error'],

    // Sigbin Google
    signInGoogleRequest: [],
    signInGoogleSuccess: [],
    signInGoogleFailure: ['errorMessage'],

    // adicionar usuário
    addUser: ['user'],

    // SignOut
    signOutRequest: [],
    signOutSuccess: [],
    signOutFailure: ['errorMessage'],

    //Atualizar
    updateRequest: ['payload'],
});

export const SessionTypes = Types;
export default Creators;
