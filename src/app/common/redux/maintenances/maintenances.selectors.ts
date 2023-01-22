import { createFeatureSelector, createSelector } from "@ngrx/store";
import { maintenancesReducerKey, maintenancesState } from "./maintenances.reducer";

export const selectFeatureMaintenances = createFeatureSelector<maintenancesState>(maintenancesReducerKey);

export const selectMaintenances = createSelector(
    selectFeatureMaintenances,
    state => state.getMaintenances
)

export const selectAddMaintenance = createSelector(
    selectFeatureMaintenances,
    state => state.addMaintenance
)

export const selectRemoveMaintenance = createSelector(
    selectFeatureMaintenances,
    state => state.removeMaintenance
)