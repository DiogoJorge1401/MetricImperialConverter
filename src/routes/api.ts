import { Application } from 'express';
import ConvertHandler from '../controllers/ConvertHandler';

export default function (app: Application) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let errorMessage
    const input = req.query.input as string;

    const initNum = convertHandler.getNum(input) as any
    if (initNum === "invalid number" || !initNum) errorMessage = 'invalid number'

    const initUnit = convertHandler.getUnit(input)
    if (initUnit === 'invalid unit') errorMessage = errorMessage ? errorMessage + ' and unit' : 'invalid unit'

    if (errorMessage) return res.json(errorMessage)

    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const returnNum = convertHandler.convert(+initNum, initUnit)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    return res.json({ initNum: +initNum, initUnit, returnNum: +returnNum, returnUnit, string })
  })

};
