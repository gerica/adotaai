import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    // RESET
    resetRedux: [],

    // CADASTRAR PET PARA DOAÇÃO
    doacaoRequest: ['payload'],
    doacaoSuccess: ['payload'],
    doacaoFailure: ['error'],

    // RECUPERAR PET POR USUÁRIO
    fetchPetPorUserRequest: ['user'],
    fetchPetPorUserSuccess: ['listaPetPorUser'],
    fetchPetPorUserFailure: ['errorMessage'],
});

export const PerfilTypes = Types;
export default Creators;
