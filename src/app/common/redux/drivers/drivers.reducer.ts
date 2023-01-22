import { createReducer, on } from "@ngrx/store";
import { DriverInfo } from "../../models/driver.model";
import * as DriverActions from './drivers.actions';

export interface driversState {
    driver: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        info?: DriverInfo | null
    };
    getDrivers: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        list: DriverInfo[]
    },
    addDriver: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        msg: string;
    }
};

export const driversInitState: driversState = {
    driver: {
        loading: false,
        loaded: false,
        failed: false
    },
    getDrivers: {
        loading: false,
        loaded: false,
        failed: false,
        list: []
    },
    addDriver: {
        loading: false,
        loaded: false,
        failed: false,
        msg: ''
    }
};

export const driversReducer = createReducer(
    driversInitState,
    on(
        DriverActions.getDriverByVehicle,
        (driversState) => ({
            ...driversState,
            driver: {
                loading: true,
                loaded: false,
                failed: false
            }
        })
    ),
    on(
        DriverActions.getDriverSuccess,
        (driverState, payload ) => {
            if (payload.driver) {
                return {
                    ...driverState,
                    driver: {
                        loading: false,
                        loaded: true,
                        failed: false,
                        info: payload.driver
                    }
                }
            } else {
                return {
                    ...driverState,
                    driver: {
                        loading: false,
                        loaded: true,
                        failed: false
                    }
                }
            }
            
        }
    ),
    on(
        DriverActions.getDriverFailed,
        driverState => ({
            ...driverState,
            driver: {
                loading: false,
                loaded: false,
                failed: true
            }
        })
    ),
    on(
        DriverActions.getAllDrivers,
        driverState => ({
            ...driverState,
            getDrivers: {
                loading: true,
                loaded: false,
                failed: false,
                list: []
            }
        })
    ),
    on(
        DriverActions.getAllDriversSuccess,
        (driverState, payload) => ({
            ...driverState,
            getDrivers: {
                loading: false,
                loaded: true,
                failed: false,
                list: payload.list
            }
        })
    ),
    on(
        DriverActions.addDriver,
        (driverState) => ({
            ...driverState,
            addDriver: {
                loading: true,
                loaded: false,
                failed: false,
                msg: ''
            }
        })
    ),
    on(
        DriverActions.addDriverSuccess,
        (driverState, payload) => ({
            ...driverState,
            addDriver: {
                loading: false,
                loaded: true,
                failed: !payload.success,
                msg: payload.msg
            }
        })
    )
);

export const driversReducerKey = 'driver';