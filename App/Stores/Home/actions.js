import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    loginRequest: ['username', 'password'],
    loginSuccess: ['username'],
    loginFailure: ['error'],
    requestWithDefaultValues: { username: 'guest', password: null },
    logout: null,
    initReducer: null,
});

export const HomeTypes = Types;
export default Creators;
