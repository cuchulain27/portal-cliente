import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCellGridBrechaComponent } from './btn-cell-grid-brecha.component';

describe('BtnCellGridBrechaComponent', () => {
  let component: BtnCellGridBrechaComponent;
  let fixture: ComponentFixture<BtnCellGridBrechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCellGridBrechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCellGridBrechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
