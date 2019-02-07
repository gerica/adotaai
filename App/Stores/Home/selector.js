
import { createSelector } from 'reselect';

const storeHome = state => state.home;
const storeForm = state => state.form;

const selectorListaDoadoresAberto = () => createSelector(storeHome, store => store.listaDoadoresAberto);
const selectorLoading = () => createSelector(storeHome, store => store.loading);
const selectorImagemPet = () => createSelector(storeHome, store => store.imagemPet);
const selectorErrorMessage = () => createSelector(storeHome, store => store.errorMessage);

const selectorForm = () => createSelector(storeForm, form => form);

export {
    selectorListaDoadoresAberto,
    selectorForm,
    selectorLoading,
    selectorImagemPet,
    selectorErrorMessage
};
