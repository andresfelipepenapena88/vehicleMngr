import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { DriverInfo } from 'src/app/common/models/driver.model';
import { Vehicle } from '../../common/models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getVehicleList(): Observable<Vehicle[]> {
    return this.afs.collection<Vehicle>('vehicles').snapshotChanges().pipe(
      map(vehicles => {
        return vehicles.map(ve => {
          const obj: Vehicle = ve.payload.doc.data();
          return {
            ...obj,
            id: ve.payload.doc.id,
          }
        })
      })
    );
  }

}
