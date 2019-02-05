
import { createSelector } from 'reselect';

const storeSession = state => state.session;
const storeForm = state => state.form;

const selectorLoading = () => createSelector(storeSession, store => store.loading);

const selectorErrorMessage = () => createSelector(storeSession, store => store.errorMessage);

const selectorSessionUser = () => createSelector(storeSession, store => store.user);

const selectorForm = () => createSelector(storeForm, form => form);

export { selectorForm, selectorLoading, selectorErrorMessage, selectorSessionUser };
