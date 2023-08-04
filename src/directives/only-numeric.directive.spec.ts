import { OnlyNumericDirective } from './only-numeric.directive';

describe('OnlyNumericDirective', () => {
  it('should create an instance', () => {
    const directive = new OnlyNumericDirective(null);
    expect(directive).toBeTruthy();
  });
});
