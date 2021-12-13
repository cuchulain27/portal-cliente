import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCellGridComponent } from './btn-cell-grid.component';

describe('BtnCellGridComponent', () => {
  let component: BtnCellGridComponent;
  let fixture: ComponentFixture<BtnCellGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnCellGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCellGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
