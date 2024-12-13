import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDisponiblesComponent } from './detalle-disponibles.component';

describe('DetalleDisponiblesComponent', () => {
  let component: DetalleDisponiblesComponent;
  let fixture: ComponentFixture<DetalleDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDisponiblesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
