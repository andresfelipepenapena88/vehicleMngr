import { createReducer, on } from "@ngrx/store";
import { Vehicle } from "src/app/common/models/vehicle.model";
import * as VehicleActions from './vehicles.actions';

export interface vehicleState {
    vehicle: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        list: Vehicle[]
    };
};

export const vehicleInitState: vehicleState = {
    vehicle: {
        loading: false,
        loaded: false,
        failed: false,
        list: []
    }
};

export const vehicleReducer = createReducer(
    vehicleInitState,
    on(
        VehicleActions.getVehicleList,
        vehicleState => ({
            ...vehicleState,
            vehicle: {
                loading: true,
                loaded: false,
                failed: false,
                list: []
            }
        })
    ),
    on(
        VehicleActions.getVehicleListSuccess,
        (vehicleState, payload ) => {
            return {
                ...vehicleState,
                vehicle: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    list: payload.list
                }
            }
        }
    ),
    on(
        VehicleActions.getVehicleListFailed,
        vehicleState => ({
            ...vehicleState,
            vehicle: {
                loading: false,
                loaded: false,
                failed: true,
                list: []
            }
        })
    )
);

export const vehicleReducerKey = 'vehicle';

