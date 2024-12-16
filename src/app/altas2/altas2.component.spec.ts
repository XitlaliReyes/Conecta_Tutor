import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Altas2Component } from './altas2.component';

describe('Altas2Component', () => {
  let component: Altas2Component;
  let fixture: ComponentFixture<Altas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Altas2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Altas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
