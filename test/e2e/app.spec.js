const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';
let nightmare;

let httpServer = app.listen(8888);
describe('End to End Test', () => {

  beforeEach(() => {
    nightmare = new Nightmare();
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it('should contain a <h1> element for the page title', () => {
    nightmare.goto(url)
      .evaluate(() => document.querySelector('h1').innerText)
        .then(headerText => {
          expect(headerText).to.not.be.null;
          expect(headerText).to.equal('Mortgage Calculator');
        });
  });

  it('should contain a <input> element with the name "principal"', () => {
    nightmare.goto(url)
      .evaluate(() => document.querySelector('input[name=principal]'))
      .then(input => expect(input).to.exist);
  });

  it('should contain a <input> element with the name "interestRate"', () => {
    nightmare.goto(url)
      .evaluate(() => document.querySelector('input[name=interestRate]'))
      .then(input => expect(input).to.exist);
  });

  it('should contain a <input> element with the name "loanTerm"', () => {
    nightmare.goto(url)
      .evaluate(() => document.querySelector('input[name=loanTerm]'))
      .then(input => expect(input).to.exist);
  });

  it('should contain a <select> element with the name "period"', () => {
    nightmare.goto(url)
      .evaluate(() => document.querySelector('select[name=period]'))
      .then(input => expect(input).to.exist);
  });

  it('should contain a <button> element with the id "calculate"', () => {
    nightmare.goto(url)
      .evaluate(() => document.querySelector('button[id=calculate]'))
      .then(input => expect(input).to.exist);
  });

  it('should contain a <p> element with the id "output"', () => {
    nightmare.goto(url)
      .evaluate(() => document.querySelector('p[id=output]'))
      .then(input => expect(input).to.exist);
  });

  it('should correctly calculate mortgage', () =>
    nightmare.goto(url)
    .wait()
    .type('input[name=principal]', 300000)
    .type('input[name=interestRate]', 3.75)
    .type('input[name=loanTerm]', 30)
    .select('select[name=period]', 12)
    .click('button#calculate')
    .wait('#output')
    .evaluate(() => document.querySelector('#output').innerText)
    .then((outputText) => {
      expect(outputText).to.equal('$1389.35');
    })
  ).timeout(6500);
});
