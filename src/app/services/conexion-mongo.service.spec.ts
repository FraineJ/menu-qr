import { TestBed } from '@angular/core/testing';

import { ConexionMongoService } from './conexion-mongo.service';

describe('ConexionMongoService', () => {
  let service: ConexionMongoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionMongoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
