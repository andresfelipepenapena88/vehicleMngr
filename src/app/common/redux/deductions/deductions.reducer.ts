import { createReducer, on } from "@ngrx/store";
import * as DeductionsActions from './deductions.actions';

export interface deductionsState {
    addDeduction: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        msg: string;
    };
    removeDeduction: {
        loading: boolean;
        loaded: boolean;
        failed: boolean;
        msg: string;
    }
};

export const deductionsInitState: deductionsState = {
    addDeduction: {
        loading: false,
        loaded: false,
        failed: false,
        msg: ''
    },
    removeDeduction: {
        loading: false,
        loaded: false,
        failed: false,
        msg: ''
    }
};

export const deductionsReducer = createReducer(
    deductionsInitState,
    on(
        DeductionsActions.addDeduction,
        (deductionsState) => ({
            ...deductionsState,
            addDeduction: {
                loading: true,
                loaded: false,
                failed: false,
                msg: ''
            }
        })
    ),
    on(
        DeductionsActions.addDeductionSuccess,
        (deductionsState, payload) => ({
            ...deductionsState,
            addDeduction: {
                loading: false,
                loaded: true,
                failed: false,
                msg: payload.msg
            }
        })
    ),
    on(
        DeductionsActions.removeDeduction,
        (deductionsState) => ({
            ...deductionsState,
            removeDeduction: {
                loading: true,
                loaded: false,
                failed: false,
                msg: ''
            }
        })
    ),
    on(
        DeductionsActions.removeDeductionSuccess,
        (deductionsState, payload) => ({
            ...deductionsState,
            removeDeduction: {
                loading: false,
                loaded: true,
                failed: false,
                msg: payload.msg
            }
        })
    )
);

export const deductionsReducerKey = 'deductions';
