import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAsesoriaComponent } from './detalle-asesoria.component';

describe('DetalleAsesoriaComponent', () => {
  let component: DetalleAsesoriaComponent;
  let fixture: ComponentFixture<DetalleAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAsesoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAsesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
