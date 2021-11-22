import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMisDireccionesComponent } from './clienteMisDirecciones.component';

describe('ClienteMisDireccionesComponent', () => {
  let component: ClienteMisDireccionesComponent;
  let fixture: ComponentFixture<ClienteMisDireccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteMisDireccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteMisDireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
