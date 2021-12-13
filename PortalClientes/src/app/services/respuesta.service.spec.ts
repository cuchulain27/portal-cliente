import { TestBed } from '@angular/core/testing';

import { RespuestaService } from './respuesta.service';

describe('RespuestaServiceService', () => {
  let service: RespuestaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
