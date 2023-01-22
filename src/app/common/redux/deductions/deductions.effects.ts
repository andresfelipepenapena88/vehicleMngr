import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { DeductionsService } from "src/app/services/deductions/deductions.service";
import { Deduction } from "../../models/deduction.model";
import { Payment } from "../../models/payment.model";
import * as fromDeductionsActions from './deductions.actions';

@Injectable()
export class DeductionsEffects {

    addDeduction$ = createEffect(() => this.actions$.pipe(
        ofType(fromDeductionsActions.deductionActionsType.ADD_DEDUCTION),
        switchMap((payload: { deduction: Deduction, payment: Payment }) => this.deductionsService.addDeduction(payload.deduction, payload.payment).pipe(
            map((response) => {
                return fromDeductionsActions.addDeductionSuccess(response);
            })
        ))
    ));

    removeDeduction$ = createEffect(() => this.actions$.pipe(
        ofType(fromDeductionsActions.deductionActionsType.REMOVE_DEDUCTION),
        switchMap((payload: { index: number, payment: Payment }) => this.deductionsService.removeDeduction(payload.index, payload.payment).pipe(
            map((response) => {
                return fromDeductionsActions.removeDeductionSuccess(response);
            })
        ))
    ));

    constructor(
        private actions$: Actions,
        private deductionsService: DeductionsService
    ) {}
}