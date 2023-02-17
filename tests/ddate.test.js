const { Ddate } = require('../src/ddate');

describe('Ddate', () => {
  const ddate = new Ddate(new Date('2023-02-17'));
  test('initialize', () => {
    console.log(ddate);
    expect(ddate instanceof Ddate).toBeTruthy();
  });
  test('text', () => {
    expect(ddate.discordianDate().text).toEqual('Today is Pungenday, the 48th day of Chaos in the YOLD 3189');
  });
});