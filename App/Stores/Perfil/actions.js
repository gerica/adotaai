import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    doacaoRequest: ['payload'],
    doacaoSuccess: ['payload'],
    doacaoFailure: ['error'],
    resetRedux: [],

    fetchPetPorUserRequest: ['user'],
    fetchPetPorUserSuccess: ['listaPetPorUser'],
    fetchPetPorUserFailure: ['errorMessage'],
});

export const PerfilTypes = Types;
export default Creators;
