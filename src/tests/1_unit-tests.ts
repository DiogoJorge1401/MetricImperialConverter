import chai, { expect } from 'chai';
let assert = chai.assert;
import ConvertHandler from '../controllers/ConvertHandler';

let convertHandler = new ConvertHandler();

describe("Unit Tests", () => {
  describe("Function convertHandler.getNum(input)", () => {
    it("Whole number input", function (done) {
      const input = '32L'
      assert.equal(convertHandler.getNum(input), 32)
      done()

    });

    it("Decimal Input", function (done) {
      const input = '2.3L'
      assert.equal(convertHandler.getNum(input), 2.3)
      done()
    });

    it("Fractional Input", function (done) {
      const input = '12/8mi'
      assert.equal(convertHandler.getNum(input), 1.5)
      done()

    });

    it("Fractional Input w/ Decimal", function (done) {
      const input = '27/5.4mi'
      assert.equal(convertHandler.getNum(input), 5)
      done()
    });

    it("Invalid Input (double fraction)", function (done) {
      const input = "3/7.2/4L";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();

    });

    it("No Numerical Input", function (done) {
      const input = "kg";
      assert.equal(convertHandler.getNum(input), 1);
      assert.equal(convertHandler.getUnit(input), "kg");
      done();

    });
  });

  describe("Function convertHandler.getUnit(input)", () => {
    it("For Each Valid Unit Inputs", function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG']

      input.forEach(unit => {
        assert.equal(convertHandler.getUnit(32 + unit), unit)
      })
      done()

    });

    it("Unknown Unit Input", function (done) {
      const input = 'mk'
      const expect = 'invalid unit'
      assert.equal(convertHandler.getUnit(input), expect)
      done()
    });
  });

  describe("Function convertHandler.getReturnUnit(initUnit)", () => {
    it("For Each Valid Unit Inputs", function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG']
      const expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs', 'L', 'gal', 'km', 'mi', 'kg', 'lbs']
      input.forEach((unit, idx) => {
        assert.equal(convertHandler.getReturnUnit(unit), expect[idx])
      })
      done()
    });
  });

  describe("Function convertHandler.spellOutUnit(unit)", () => {
    it("For Each Valid Unit Inputs", function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG']
      const expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms', 'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']

      input.forEach((unit, idx) => {
        assert.equal(convertHandler.spellOutUnit(unit), expect[idx])
      })

      done()
    });
  });

  describe("Function convertHandler.convert(num, unit)", () => {
    it("Gal to L", function (done) {
      const expect = 18.9271
      assert.approximately(+convertHandler.convert(5, 'gal'), expect, 0.1)
      done()
    });

    it("L to Gal", function (done) {
      const expect = 1.32086
      assert.approximately(+convertHandler.convert(5, 'l'), expect, 0.1)
      done()
    });

    it("Mi to Km", function (done) {
      const expect = 8.04672
      assert.approximately(+convertHandler.convert(5, 'mi'), expect, 0.1)
      done()

    });

    it("Km to Mi", function (done) {
      const expect = 3.10686
      assert.approximately(+convertHandler.convert(5, 'km'), expect, 0.1)
      done()

    });

    it("Lbs to Kg", function (done) {
      const expect = 11.0231
      assert.approximately(+convertHandler.convert(5, 'kg'), expect, 0.1)
      done()
    });

    it("Kg to Lbs", function (done) {
      const expect = 2.26796
      assert.approximately(+convertHandler.convert(5, 'lbs'), expect, 0.1)
      done()
    });
  });
});