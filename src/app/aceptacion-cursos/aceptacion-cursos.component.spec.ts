import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptacionCursosComponent } from './aceptacion-cursos.component';

describe('AceptacionCursosComponent', () => {
  let component: AceptacionCursosComponent;
  let fixture: ComponentFixture<AceptacionCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptacionCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptacionCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
