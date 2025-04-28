import { ElementRef } from '@angular/core';
import { TextUppercaseTransformDirective } from './text-uppercase-transform.directive';

describe('TextUppercaseTransformDirective', () => {
  let directive: TextUppercaseTransformDirective;
  let mock: ElementRef;

  beforeEach(() => {
    mock = new ElementRef({});
    directive = new TextUppercaseTransformDirective(mock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
