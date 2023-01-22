import { createFeatureSelector, createSelector } from "@ngrx/store";
import { deductionsReducerKey, deductionsState } from "./deductions.reducer";

export const selectFeatureDeductions = createFeatureSelector<deductionsState>(deductionsReducerKey);

export const selectAddDeductions = createSelector(
    selectFeatureDeductions,
    state => state.addDeduction
)

export const selectRemoveDeductions = createSelector(
    selectFeatureDeductions,
    state => state.removeDeduction
)