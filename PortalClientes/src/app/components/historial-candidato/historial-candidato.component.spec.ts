import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCandidatoComponent } from './historial-candidato.component';

describe('HistorialCandidatoComponent', () => {
  let component: HistorialCandidatoComponent;
  let fixture: ComponentFixture<HistorialCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialCandidatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
