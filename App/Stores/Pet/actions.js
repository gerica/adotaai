import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    // GERAL
    resetRedux: [],
    success: ['message'],
    failure: ['error'],

    // CADASTRAR PET PARA DOAÇÃO
    cadastroDoacaoRequest: ['payload'],    

    // RECUPERAR PET POR USUÁRIO
    fetchPetPorUserRequest: ['user'],
    fetchPetPorUserSuccess: ['listaPetPorUser'],
    
});

export const PerfilTypes = Types;
export default Creators;
