import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTutorComponent } from './detalle-tutor.component';

describe('DetalleTutorComponent', () => {
  let component: DetalleTutorComponent;
  let fixture: ComponentFixture<DetalleTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleTutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
