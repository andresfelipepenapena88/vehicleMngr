import { TestBed } from '@angular/core/testing';

import { VehiclesService } from './vehicles.service';

describe('PaymentsService', () => {
  let service: VehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
