import { TestBed } from '@angular/core/testing';

import { LevantaBrechaService } from './levanta-brecha.service';

describe('LevantaBrechaService', () => {
  let service: LevantaBrechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevantaBrechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
