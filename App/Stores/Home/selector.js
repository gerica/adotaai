
import { createSelector } from 'reselect';

const storeDataReducer = state => state.dataReducer;
const storeForm = state => state.form;

const selectorData = () =>
    createSelector(
        storeDataReducer,
        state => state.data,
    );

const selectorLoading = () =>
    createSelector(
        storeDataReducer,
        store => store.loading,
    );

const selectorForm = () =>
    createSelector(
        storeForm,
        form => form,
    );

export { selectorData, selectorForm, selectorLoading };
