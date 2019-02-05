import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    resetRedux: [],
    
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
