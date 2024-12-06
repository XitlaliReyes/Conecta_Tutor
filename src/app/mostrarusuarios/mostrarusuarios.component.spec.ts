import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarusuariosComponent } from './mostrarusuarios.component';

describe('MostrarusuariosComponent', () => {
  let component: MostrarusuariosComponent;
  let fixture: ComponentFixture<MostrarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarusuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
