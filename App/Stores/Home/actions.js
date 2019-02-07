import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    loginRequest: ['username', 'password'],
    loginSuccess: ['username'],
    loginFailure: ['error'],
    requestWithDefaultValues: { username: 'guest', password: null },
    logout: null,
    initReducer: null,
    fetchDoadoresAbertoRequest: null,
    fetchDoadoresAbertoSuccess: ['listaDoadoresAberto'],
    fetchDoadoresAbertoFailure: ['errorMessage'],
    getImagemPet: ['object'],
    getImagemPetSuccess: ['key', 'imagemPet'],
    getImagemPetFailure: ['key', 'errorMessage'],
    changeLoading: ['loading'],
    reset: [],
});

export const HomeTypes = Types;
export default Creators;
