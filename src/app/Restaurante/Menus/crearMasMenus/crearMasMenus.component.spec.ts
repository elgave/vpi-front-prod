import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMasMenusComponent } from './crearMasMenus.component';

describe('CrearMasMenusComponent', () => {
  let component: CrearMasMenusComponent;
  let fixture: ComponentFixture<CrearMasMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearMasMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMasMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
