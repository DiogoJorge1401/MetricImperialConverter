interface Convertion {
  [key: string]: (n: number) => number
}

export default class ConvertHandler {

  private inputRegex = /[a-z]+|[^a-z]+/gi
  private units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG']
  private fromAbbrToFull = {
    GAL: 'gallons',
    LBS: 'pounds',
    MI: 'miles',
    L: 'liters',
    KG: 'kilograms',
    KM: 'kilometers',
  }
  private fromOneUnitToAnother = {
    GAL: 'L',
    LBS: 'kg',
    MI: 'km',
    L: 'gal',
    KG: 'lbs',
    KM: 'mi',
  }


  getNum(input: string) {
    let result = (input.match(this.inputRegex) as string[])[0] as any

    if (result.includes('/')) {
      let temp = result.split('/')

      if (temp.length !== 2)
        return 'invalid number'

      return parseFloat(temp[0]) / parseFloat(temp[1])
    }
    if (isNaN(result) && (this.getUnit(result) !== 'invalid unit'))
      return 1

    return +result;
  };

  getUnit(input: string) {
    let result = input.match(this.inputRegex) as any
    result = result[1] ?? result[0]
    if (!this.isValidUnit(result))
      result = 'invalid unit'
    return result;
  };

  getReturnUnit(initUnit: string) {
    return this.fromOneUnitToAnother[initUnit.toUpperCase()]
  };

  convert(initNum: number, initUnit: string) {
    const conversionFn = this.getConversionFunction(initUnit.toUpperCase())
    return conversionFn(initNum).toFixed(5);
  };

  getString(initNum: number, initUnit: string, returnNum: string, returnUnit: string) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };

  spellOutUnit(unit: string) {
    return this.fromAbbrToFull[unit.toUpperCase()];
  };

  private getConversionFunction(initUnit: string) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const possibilities: Convertion = {
      GAL: (num) => galToL * num,
      LBS: (num) => lbsToKg * num,
      MI: (num) => miToKm * num,
      L: (num) => num / galToL,
      KG: (num) => num / lbsToKg,
      KM: (num) => num / miToKm,
    }

    return possibilities[initUnit]
  }

  private isValidUnit(unit: string) {
    return this.units.includes(unit)
  }

}
