
import { createSelector } from 'reselect';

const storePet = state => state.pet;
const storeForm = state => state.form;

const selectorListaPetPorUser = () => createSelector(storePet, store => store.listaPetPorUser);
const selectorLoading = () => createSelector(storePet, store => store.loading);
const selectorError = () => createSelector(storePet, store => store.error);
const selectorMessage = () => createSelector(storePet, store => store.message);

const selectorForm = () => createSelector(storeForm, form => form);

export {
    selectorForm,
    selectorLoading,
    selectorError,
    selectorMessage,
    selectorListaPetPorUser
};
