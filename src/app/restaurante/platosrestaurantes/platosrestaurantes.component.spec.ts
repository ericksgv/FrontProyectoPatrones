import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatosrestaurantesComponent } from './platosrestaurantes.component';

describe('PlatosrestaurantesComponent', () => {
  let component: PlatosrestaurantesComponent;
  let fixture: ComponentFixture<PlatosrestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatosrestaurantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatosrestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
