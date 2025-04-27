import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantsComponent } from './accountants.component';

describe('AccountantsComponent', () => {
  let component: AccountantsComponent;
  let fixture: ComponentFixture<AccountantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
