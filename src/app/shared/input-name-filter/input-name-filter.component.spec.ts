import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNameFilterComponent } from './input-name-filter.component';

describe('InputNameFilterComponent', () => {
  let component: InputNameFilterComponent;
  let fixture: ComponentFixture<InputNameFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNameFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputNameFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
