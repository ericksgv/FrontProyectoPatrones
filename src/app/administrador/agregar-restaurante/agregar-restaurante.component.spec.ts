import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRestauranteComponent } from './agregar-restaurante.component';

describe('AgregarRestauranteComponent', () => {
  let component: AgregarRestauranteComponent;
  let fixture: ComponentFixture<AgregarRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarRestauranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
