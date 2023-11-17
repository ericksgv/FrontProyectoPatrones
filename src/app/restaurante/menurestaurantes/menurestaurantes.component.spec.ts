import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenurestaurantesComponent } from './menurestaurantes.component';

describe('MenurestaurantesComponent', () => {
  let component: MenurestaurantesComponent;
  let fixture: ComponentFixture<MenurestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenurestaurantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenurestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
