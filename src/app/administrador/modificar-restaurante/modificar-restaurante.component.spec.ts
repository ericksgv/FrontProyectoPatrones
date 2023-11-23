import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRestauranteComponent } from './modificar-restaurante.component';

describe('ModificarRestauranteComponent', () => {
  let component: ModificarRestauranteComponent;
  let fixture: ComponentFixture<ModificarRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarRestauranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
