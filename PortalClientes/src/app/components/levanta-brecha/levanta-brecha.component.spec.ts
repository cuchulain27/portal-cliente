import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevantaBrechaComponent } from './levanta-brecha.component';

describe('LevantaBrechaComponent', () => {
  let component: LevantaBrechaComponent;
  let fixture: ComponentFixture<LevantaBrechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevantaBrechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevantaBrechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
