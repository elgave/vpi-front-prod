import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerBalanceComponent } from './obtenerBalance.component';

describe('ObtenerBalanceComponent', () => {
  let component: ObtenerBalanceComponent;
  let fixture: ComponentFixture<ObtenerBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
