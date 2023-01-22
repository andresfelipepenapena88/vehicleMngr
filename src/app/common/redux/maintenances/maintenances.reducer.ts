import { createReducer, on } from "@ngrx/store";
import { Maintenance } from "../../models/maintenance.model";
import * as MaintenanceActions from './maintenances.actions';

export interface maintenancesState {
    getMaintenances: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        list?: Maintenance[];
    };
    addMaintenance: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        msg: string;
    };
    removeMaintenance: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        msg: string;
    }
};

export const maintenancesInitState: maintenancesState = {
    getMaintenances: {
        loading: false,
        loaded: false,
        failed: false
    },
    addMaintenance: {
        loading: false,
        loaded: false,
        failed: false,
        msg: ''
    },
    removeMaintenance: {
        loading: false,
        loaded: false,
        failed: false,
        msg: ''
    }
};

export const maintenancesReducer = createReducer(
    maintenancesInitState,
    on(
        MaintenanceActions.getMaintenances,
        (maintenancesState) => ({
            ...maintenancesState,
            getMaintenances: {
                loading: true,
                loaded: false,
                failed: false
            }
        })
    ),
    on(
        MaintenanceActions.getMaintenancesSuccess,
        (maintenancesState, payload) => ({
            ...maintenancesState,
            getMaintenances: {
                loading: false,
                loaded: false,
                failed: false,
                list: payload.list
            }
        })
    ),
    on(
        MaintenanceActions.addMaintenance,
        (maintenancesState) => ({
            ...maintenancesState,
            addMaintenance: {
                loading: true,
                loaded: false,
                failed: false,
                msg: ''
            }
        })
    ),
    on(
        MaintenanceActions.addMaintenanceSuccess,
        (maintenanceState, payload) => ({
            ...maintenanceState,
            addMaintenance: {
                loading: false,
                loaded: payload.success,
                failed: !payload.success,
                msg: payload.msg
            }
        })
    ),
    on(
        MaintenanceActions.removeMaintenance,
        (maintenanceState) => ({
            ...maintenanceState,
            removeMaintenance: {
                loading: true,
                loaded: false,
                failed: false,
                msg: ''
            }
        })
    ),
    on(
        MaintenanceActions.removeMaintenanceSuccess,
        (maintenanceState, payload) => ({
            ...maintenanceState,
            removeMaintenance: {
                loading: false,
                loaded: payload.success,
                failed: !payload.success,
                msg: payload.msg
            }
        })
    )
);

export const maintenancesReducerKey = 'maintenances';
