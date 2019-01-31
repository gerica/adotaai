import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    addUser: ['user'],
    removeUser: [],

});

export const SessionTypes = Types;
export default Creators;
