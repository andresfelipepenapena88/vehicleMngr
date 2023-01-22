import { createFeatureSelector, createSelector } from "@ngrx/store";
import { vehicleReducerKey, vehicleState } from "./vehicles.reducer";

export const selectFeatureVehicles = createFeatureSelector<vehicleState>(vehicleReducerKey);

export const selectVehicleList = createSelector(
    selectFeatureVehicles,
    state => state.vehicle
)