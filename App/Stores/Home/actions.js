import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    loginRequest: ['username', 'password'],
    loginSuccess: ['username'],
    loginFailure: ['error'],
    requestWithDefaultValues: { username: 'guest', password: null },
    logout: null,
    initReducer: null,
    fetchDoadores: null,
    fetchDoadoresSuccess: ['listaDoadores'],
    fetchDoadoresFailure: ['errorMessage'],
    getImagemPet: ['object'],
    getImagemPetSuccess: ['key', 'imagemPet'],
    getImagemPetFailure: ['key', 'errorMessage'],
    changeLoading: ['loading'],
});

export const HomeTypes = Types;
export default Creators;
