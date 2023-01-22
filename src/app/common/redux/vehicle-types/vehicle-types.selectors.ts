import { createFeatureSelector, createSelector } from "@ngrx/store";
import { vehicleTypesReducerKey, vehicleTypesState } from "./vehicle-types.reducer";

export const selectFeatureVehicleTypes = createFeatureSelector<vehicleTypesState>(vehicleTypesReducerKey);

export const selectVehicleTypes = createSelector(
    selectFeatureVehicleTypes,
    state => state.vehicleTypes
)