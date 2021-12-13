import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizaComponent } from './autoriza.component';

describe('AutorizaComponent', () => {
  let component: AutorizaComponent;
  let fixture: ComponentFixture<AutorizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
