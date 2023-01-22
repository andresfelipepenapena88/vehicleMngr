import { createReducer, on } from "@ngrx/store";
import { VehicleTypes } from "src/app/common/models/vehicle-types.model";
import * as VehicleTypesActions from './vehicle-types.actions';

export interface vehicleTypesState {
    vehicleTypes: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        types: VehicleTypes[];
    };
};

export const vehicleTypesInitState: vehicleTypesState = {
    vehicleTypes: {
        loading: false,
        loaded: false,
        failed: false,
        types: []
    }
};

export const vehicleTypesReducer = createReducer(
    vehicleTypesInitState,
    on(
        VehicleTypesActions.getVehicleTypes,
        vehicleTypesState => ({
            ...vehicleTypesState,
            vehicleTypes: {
                loading: true,
                loaded: false,
                failed: false,
                types: []
            }
        })
    ),
    on(
        VehicleTypesActions.getVehicleTypesSuccess,
        (vehicleTypesState, payload ) => {
            return {
                ...vehicleTypesState,
                vehicleTypes: {
                    loading: false,
                    loaded: true,
                    failed: false,
                    types: payload.types
                }
            }
        }
    ),
    on(
        VehicleTypesActions.getVehicleTypesFailed,
        vehicleTypesState => ({
            ...vehicleTypesState,
            vehicleTypes: {
                loading: false,
                loaded: false,
                failed: true,
                types: []
            }
        })
    )
);

export const vehicleTypesReducerKey = 'vehicle-types';

