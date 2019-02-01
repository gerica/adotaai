
import { createSelector } from 'reselect';

const storeSession = state => state.session;

const selectorSessionUser = () => createSelector(storeSession, store => store.user);

export { selectorSessionUser };
