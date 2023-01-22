import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable, of } from 'rxjs';
import { Deduction } from 'src/app/common/models/deduction.model';
import { Payment } from 'src/app/common/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class DeductionsService {

  constructor(private afs: AngularFirestore) { }

  public addDeduction(deduction: Deduction, payment: Payment): Observable<{ msg: string }> {
    let deductions: Deduction[] | undefined = payment?.deductions;
    if (deductions == undefined) {
      deductions = [];
    }
    deductions = [ ...deductions, deduction ];
    const addDeduction: Partial<Payment> = { deductions };
    return from(this.afs.doc('payments/'+payment.id).update(addDeduction)).pipe(
      map(response => {
        return { msg: 'Deduccion guardada correctamente!' };
      })
    );
  }

  public removeDeduction(index: number, payment: Payment): Observable<{ msg: string }> {
    let deductions: Deduction[] | undefined = payment?.deductions;
    if (deductions == undefined) {
      return of({ msg: 'No hay deducciones a eliminar en este pago' });
    }
    const newDeduction: Deduction[] = deductions.filter((deduction, i) => i != index);
    const removeDeduction: Partial<Payment> = { deductions: [ ...newDeduction] };
    return from(this.afs.doc('payments/'+payment.id).update(removeDeduction)).pipe(
      map(response => {
        return { msg: 'Deduccion eliminada correctamente!' };
      })
    );
  }

}
