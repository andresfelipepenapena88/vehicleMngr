import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { VehicleTypes } from 'src/app/common/models/vehicle-types.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypesService {

  constructor(
    private afs: AngularFirestore
  ) { }

  

  getVehicleTypesList(): Observable<VehicleTypes[]> {
    return this.afs.collection<VehicleTypes>('vehicle-types').valueChanges();
  }

}
