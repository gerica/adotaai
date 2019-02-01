
import { createSelector } from 'reselect';

const storeHome = state => state.home;
const storeForm = state => state.form;

const selectorListaDoadores = () => createSelector(storeHome, store => store.listaDoadores);
const selectorLoading = () => createSelector(storeHome, store => store.loading);
const selectorImagemPet = () => createSelector(storeHome, store => store.imagemPet);

const selectorForm = () => createSelector(storeForm, form => form);

export { selectorListaDoadores, selectorForm, selectorLoading, selectorImagemPet };
