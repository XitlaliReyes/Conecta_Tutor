import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsesoriaComponent } from './crear-asesoria.component';

describe('CrearAsesoriaComponent', () => {
  let component: CrearAsesoriaComponent;
  let fixture: ComponentFixture<CrearAsesoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAsesoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAsesoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
