const { Ddate } = require('../src/ddate');

// const { describe, test, expect } = require('@jest/globals');

// TODO: describe the tests in more detail
describe('Ddate', () => {
  const ddate = new Ddate(new Date(2023, 1, 17)),
    ddateEn = new Ddate(new Date(2023, 1, 17), 'en'),
    ddateRu = new Ddate(new Date(2023, 1, 17), 'ru');

  describe('Non static', () => {
    describe('Properties', () => {
      test('initialize', () => {
        expect(ddate instanceof Ddate).toBeTruthy();
        expect(ddateEn instanceof Ddate).toBeTruthy();
        expect(ddateRu instanceof Ddate).toBeTruthy();
      });

      describe('locale', () => {
        test('default', () => {
          expect(ddate.locale).toEqual('en');
        });

        test('en', () => {
          expect(ddateEn.locale).toEqual('en');
        });

        test('ru', () => {
          expect(ddateRu.locale).toEqual('ru');
        });
      });

      test('today', () => {
        expect(ddate.today instanceof Date).toBeTruthy();
        expect(ddate.today).toEqual(new Date(2023, 1, 17));
      });

      test('text', () => {
        expect(ddate.discordianDate().text).toEqual('Today is Pungenday, the 48th day of Chaos in the YOLD 3189.');
      });
    });

    describe('Methods', () => {
      test('isToday', () => {
        expect(ddate.isToday(new Date(2023, 1, 17))).toBeTruthy();
        expect(ddate.isToday(new Date(2023, 1, 18))).toBeFalsy();
      });


      describe('discordianDate', () => {
        test('en', () => {});

        test('ru', () => {});
      });

      describe('format', () => {
        test('default', () => {
          expect(ddate.format('Today is %{%A, the %e of %B%}, %Y.')).toEqual('Today is Pungenday, the 48th of Chaos, 3189.');
        });

        test('en', () => {
          expect(ddateEn.format('Today is %{%A, the %e of %B%}, %Y.')).toEqual('Today is Pungenday, the 48th of Chaos, 3189.');
        });

        test('ru', () => {
          expect(ddateRu.format('Сегодня %{%A, %e день %B%}, %Y.')).toEqual('Сегодня Остреда, 48й день Хаоса, 3189.');
        });
      });

      describe('_numberize', () => {
        test('default', () => {
          expect(ddate._numberize('1')).toEqual('1st');
          expect(ddate._numberize('2')).toEqual('2nd');
          expect(ddate._numberize('3')).toEqual('3rd');
          expect(ddate._numberize('4')).toEqual('4th');
          expect(ddate._numberize('48')).toEqual('48th');
          expect(ddate._numberize('51')).toEqual('51st');
        });

        test('en', () => {
          expect(ddateEn._numberize('1')).toEqual('1st');
          expect(ddateEn._numberize('2')).toEqual('2nd');
          expect(ddateEn._numberize('3')).toEqual('3rd');
          expect(ddateEn._numberize('4')).toEqual('4th');
          expect(ddateEn._numberize('48')).toEqual('48th');
          expect(ddateEn._numberize('51')).toEqual('51st');
        });

        test('ru', () => {
          expect(ddateRu._numberize('48')).toEqual('48й');
        });
      });
    });
  });

  describe('Static', () => {
    describe('Properties', () => {
      test('dictionary', () => {

      });

      test('dayCount', () => {
        
      });
    });

    describe('Methods', () => {
      test('isLeapYear', () => {
        expect(Ddate.isLeapYear(ddate.today)).toBeFalsy();
        expect(Ddate.isLeapYear(new Date(2020, 1, 1))).toBeTruthy();
      });

      test('getDayOfYear', () => {
        expect(Ddate.getDayOfYear(new Date(2023, 1, 17))).toEqual(48);
        expect(Ddate.getDayOfYear(new Date(2020, 2, 1))).toEqual(60);
      });
    });
  });
});
