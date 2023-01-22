import { createFeatureSelector, createSelector } from "@ngrx/store";
import { paymentsReducerKey, paymentsState } from "./payments.reducer";

export const selectFeaturePayments = createFeatureSelector<paymentsState>(paymentsReducerKey);

export const selectPayments = createSelector(
    selectFeaturePayments,
    state => state.payments
)