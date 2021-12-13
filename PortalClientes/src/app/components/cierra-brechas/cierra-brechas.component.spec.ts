import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierraBrechasComponent } from './cierra-brechas.component';

describe('CierraBrechasComponent', () => {
  let component: CierraBrechasComponent;
  let fixture: ComponentFixture<CierraBrechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CierraBrechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CierraBrechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
