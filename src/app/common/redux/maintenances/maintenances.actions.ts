import { createAction, props } from "@ngrx/store";
import { Maintenance } from "../../models/maintenance.model";

export enum maintenanceActionsType {
    GET_MAINTENANCES = '[MAINTENACES] GET MAINTENACES',
    GET_MAINTENANCES_SUCCESS = '[MAINTENACES] GET MAINTENACES SUCCESS',
    ADD_MAINTENANCE = '[MAINTENACES] ADD MAINTENACE',
    ADD_MAINTENANCE_SUCCESS = '[MAINTENACES] ADD MAINTENACE SUCCESS',
    REMOVE_MAINTENANCE = '[MAINTENACES] REMOVE MAINTENANCE',
    REMOVE_MAINTENANCE_SUCCESS = '[MAINTENACES] REMOVE MAINTENANCE SUCCESS',
};

export const getMaintenances = createAction(
    maintenanceActionsType.GET_MAINTENANCES,
    props<{ vehicleRef: string | null; driverRef: string | null; }>()
);

export const getMaintenancesSuccess = createAction(
    maintenanceActionsType.GET_MAINTENANCES_SUCCESS,
    props<{ list: Maintenance[] }>()
);

export const addMaintenance = createAction(
    maintenanceActionsType.ADD_MAINTENANCE,
    props<{ vehicleRef: string | null; driverRef: string | null; maintenance: Maintenance }>()
);

export const addMaintenanceSuccess = createAction(
    maintenanceActionsType.ADD_MAINTENANCE_SUCCESS,
    props<{ success: boolean; msg: string }>()
);

export const removeMaintenance = createAction(
    maintenanceActionsType.REMOVE_MAINTENANCE,
    props<{ id: string }>()
);

export const removeMaintenanceSuccess = createAction(
    maintenanceActionsType.REMOVE_MAINTENANCE_SUCCESS,
    props<{ success: boolean; msg: string }>()
);