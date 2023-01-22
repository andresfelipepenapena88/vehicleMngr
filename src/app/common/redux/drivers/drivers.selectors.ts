import { createFeatureSelector, createSelector } from "@ngrx/store";
import { driversReducerKey, driversState } from "./drivers.reducer";

export const selectFeatureDrivers = createFeatureSelector<driversState>(driversReducerKey);

export const selectDriver = createSelector(
    selectFeatureDrivers,
    state => state.driver
);

export const selectAllDrivers = createSelector(
    selectFeatureDrivers,
    state => state.getDrivers
);

export const selectAddDriver = createSelector(
    selectFeatureDrivers,
    state => state.addDriver
);