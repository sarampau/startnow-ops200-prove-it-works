const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
  let mortgage = null;

  beforeEach(() => {
    mortgage = new Mortgage();
  });

  it('should have a monthlyPayment function', () => {
    expect(mortgage.monthlyPayment).to.exist;
  });

  it('should have a constructor function', () => {
    expect(mortgage.constructor).to.exist;
  });

  it('should display correct 30 year mortgage payment', () => {
    mortgage = new Mortgage(300000, 5, 30, 12);
    expect(mortgage.monthlyPayment()).to.equal('1610.46');
  });

  it('should display correct 15 year mortgage payment', () => {
    mortgage = new Mortgage(500000, 4.5, 15, 12);
    expect(mortgage.monthlyPayment()).to.equal('3824.97');
  });
});
