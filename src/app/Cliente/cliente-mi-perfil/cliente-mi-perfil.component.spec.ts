import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteMiPerfilComponent } from './cliente-mi-perfil.component';

describe('ClienteMiPerfilComponent', () => {
  let component: ClienteMiPerfilComponent;
  let fixture: ComponentFixture<ClienteMiPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteMiPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteMiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
