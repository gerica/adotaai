import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({


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
