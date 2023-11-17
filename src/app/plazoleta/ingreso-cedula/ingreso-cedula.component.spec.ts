import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoCedulaComponent } from './ingreso-cedula.component';

describe('IngresoCedulaComponent', () => {
  let component: IngresoCedulaComponent;
  let fixture: ComponentFixture<IngresoCedulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoCedulaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoCedulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
