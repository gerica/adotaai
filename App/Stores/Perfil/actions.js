import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    doacaoRequest: ['payload'],
    doacaoSuccess: ['payload'],
    doacaoFailure: ['error'],
    resetRedux: [],
});

export const PerfilTypes = Types;
export default Creators;
