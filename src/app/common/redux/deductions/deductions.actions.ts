import { createAction, props } from "@ngrx/store";
import { Deduction } from "../../models/deduction.model";
import { Payment } from "../../models/payment.model";

export enum deductionActionsType {
    ADD_DEDUCTION = '[DEDUCTIONS] ADD DEDUCTION',
    ADD_DEDUCTION_SUCCESS = '[DEDUCTIONS] ADD DEDUCTION SUCCESS',
    REMOVE_DEDUCTION = '[DEDUCTIONS] REMOVE DEDUCTION',
    REMOVE_DEDUCTION_SUCCESS = '[DEDUCTIONS] REMOVE DEDUCTION SUCCESS',
};

export const addDeduction = createAction(
    deductionActionsType.ADD_DEDUCTION,
    props<{ deduction: Deduction, payment: Payment }>()
);

export const addDeductionSuccess = createAction(
    deductionActionsType.ADD_DEDUCTION_SUCCESS,
    props<{ msg: string }>()
);

export const removeDeduction = createAction(
    deductionActionsType.REMOVE_DEDUCTION,
    props<{ index: number, payment: Payment }>()
);

export const removeDeductionSuccess = createAction(
    deductionActionsType.REMOVE_DEDUCTION_SUCCESS,
    props<{ msg: string }>()
);