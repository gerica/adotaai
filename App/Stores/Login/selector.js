
import { createSelector } from 'reselect';

const storeLogin = state => state.login;
const storeForm = state => state.form;

const selectorLoading = () => createSelector(storeLogin, store => store.loading);
const selectorErrorMessage = () => createSelector(storeLogin, store => store.errorMessage);

const selectorForm = () => createSelector(storeForm, form => form);

export { selectorForm, selectorLoading, selectorErrorMessage };
