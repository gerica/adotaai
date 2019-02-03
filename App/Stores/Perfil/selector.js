
import { createSelector } from 'reselect';

const storePerfil = state => state.perfil;
const storeForm = state => state.form;

// const selectorListaDoadores = () => createSelector(storePerfil, store => store.listaDoadores);
const selectorLoading = () => createSelector(storePerfil, store => store.loading);
const selectorErroMessage = () => createSelector(storePerfil, store => store.errorMessage);
const selectorMessage = () => createSelector(storePerfil, store => store.message);

const selectorForm = () => createSelector(storeForm, form => form);

export { selectorForm, selectorLoading, selectorErroMessage, selectorMessage };
