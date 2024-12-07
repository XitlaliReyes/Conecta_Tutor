import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateusrComponent } from './updateusr.component';

describe('UpdateusrComponent', () => {
  let component: UpdateusrComponent;
  let fixture: ComponentFixture<UpdateusrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateusrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateusrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
