import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMenuComponent } from './modificarMenu.component';

describe('ModificarMenuComponent', () => {
  let component: ModificarMenuComponent;
  let fixture: ComponentFixture<ModificarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
