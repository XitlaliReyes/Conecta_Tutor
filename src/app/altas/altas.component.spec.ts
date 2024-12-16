import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltasComponent } from './altas.component';

describe('AltasComponent', () => {
  let component: AltasComponent;
  let fixture: ComponentFixture<AltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
