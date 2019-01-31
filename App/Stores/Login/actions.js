import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    loginRequest: ['email', 'password'],
    loginSuccess: [],
    loginFailure: ['error'],
});

export const LoginTypes = Types;
export default Creators;
