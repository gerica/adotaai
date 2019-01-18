import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    home: null,
});

export const RootTypes = Types;
export default Creators;
