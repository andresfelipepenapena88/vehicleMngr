import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { Maintenance } from 'src/app/common/models/maintenance.model';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenancesService {

  constructor(
    private afs: AngularFirestore,
    private datePipe: DatePipe,
    private commonService: CommonService
  ) { }

  getMaintenances(vehicleRef: string, driverRef: string): Observable<Maintenance[] | null> {
    return this.commonService.getVehicleByDriver(vehicleRef, driverRef).pipe(switchMap(snapshot => {
      if (snapshot == null || snapshot[0] == null) {
        return of(null);
      }
      return this.afs.collection<Maintenance>(
        'maintenances',
        ref => ref.where('vehicleByDriver', '==', snapshot[0].payload.doc.id)
        ).snapshotChanges().pipe(map((response: any[]) => {
          const maintenances: Maintenance[] = response.map(snap => {
            const maintenance = snap.payload.doc.data();
            return {
              ...maintenance,
              id: snap.payload.doc.id,
              date: this.datePipe.transform(maintenance.date.toDate(), 'dd / MMM / YYYY')
            };
          });
          return maintenances;
        }))
    }));
  }

  addMaintenance(vehicleRef: string, driverRef: string, newMaintenance: Maintenance): Observable<{ success: boolean; msg: string } | null> {
    return this.commonService.getVehicleByDriver(vehicleRef, driverRef).pipe(switchMap(snapshot => {
      if (snapshot == null || snapshot[0] == null) {
        return of(null);
      }
      // Esto se hace ya que al transformar un string a date JAVASCRIPT resta un dia
      // de esta forma se evita esto
      const correctDate = this.datePipe.transform(newMaintenance.date, 'MM-dd-YYYY') || '';
      const timeStampMaintenance = {
        ...newMaintenance,
        date: Timestamp.fromDate(new Date(correctDate)),
        vehicleByDriver: snapshot[0].payload.doc.id
      };
      return from(this.afs.collection('maintenances').add(timeStampMaintenance)).pipe(map(response => {
        return { success: true, msg: '¡ Mantenimiento guardado exitosamente !' };
      }));
    }));
  }

  removeMaintenance(id: string): Observable<{ success: boolean; msg: string }> {
    return from(this.afs.doc('maintenances/'+id).delete()).pipe(
      map(response => {
        return { success: true, msg: '¡ Mantenimiento eliminado correctamente !' };
      })
    );
  }
}
