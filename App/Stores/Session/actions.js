import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    addUser: ['user'],
    removeUser: [],
    removeUserFailure: ['errorMessage'],
    updateRequest: ['payload'],

});

export const SessionTypes = Types;
export default Creators;
