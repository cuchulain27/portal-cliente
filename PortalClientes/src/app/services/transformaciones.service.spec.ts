import { TestBed } from '@angular/core/testing';

import { TransformacionesService } from './transformaciones.service';

describe('TransformacionesService', () => {
  let service: TransformacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
