import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStatusFilterComponent } from './input-status-filter.component';

describe('InputStatusFilterComponent', () => {
  let component: InputStatusFilterComponent;
  let fixture: ComponentFixture<InputStatusFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputStatusFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
