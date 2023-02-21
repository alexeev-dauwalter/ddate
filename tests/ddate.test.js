const { Ddate } = require('../src/ddate');

// const { describe, test, expect } = require('@jest/globals');

// TODO: describe the tests in more detail
describe('Ddate', () => {
  const ddate = new Ddate(new Date(2023, 1, 17)),
    ddateEn = new Ddate(new Date(2023, 1, 17), 'en'),
    ddateRu = new Ddate(new Date(2023, 1, 17), 'ru'),
    tibsDay = new Date(2020, 1, 29);

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
        describe('default', () => {
          describe('Holidays', () => {
            describe('5', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 0, 5)).discordianDate().celebrateHoliday).toEqual('Mungday');
                expect(new Ddate(new Date(2021, 2, 19)).discordianDate().celebrateHoliday).toEqual('Mojoday');
                expect(new Ddate(new Date(2021, 4, 31)).discordianDate().celebrateHoliday).toEqual('Syaday');
                expect(new Ddate(new Date(2021, 7, 12)).discordianDate().celebrateHoliday).toEqual('Zaraday');
                expect(new Ddate(new Date(2021, 9, 24)).discordianDate().celebrateHoliday).toEqual('Maladay');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 0, 5)).discordianDate().celebrateHoliday).toEqual('Mungday');
                expect(new Ddate(new Date(2020, 2, 19)).discordianDate().celebrateHoliday).toEqual('Mojoday');
                expect(new Ddate(new Date(2020, 4, 31)).discordianDate().celebrateHoliday).toEqual('Syaday');
                expect(new Ddate(new Date(2020, 7, 12)).discordianDate().celebrateHoliday).toEqual('Zaraday');
                expect(new Ddate(new Date(2020, 9, 24)).discordianDate().celebrateHoliday).toEqual('Maladay');
              });
            });

            describe('50', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 19)).discordianDate().celebrateHoliday).toEqual('Chaoflux');
                expect(new Ddate(new Date(2021, 4, 3)).discordianDate().celebrateHoliday).toEqual('Discoflux');
                expect(new Ddate(new Date(2021, 6, 15)).discordianDate().celebrateHoliday).toEqual('Confuflux');
                expect(new Ddate(new Date(2021, 8, 26)).discordianDate().celebrateHoliday).toEqual('Bureflux');
                expect(new Ddate(new Date(2021, 11, 8)).discordianDate().celebrateHoliday).toEqual('Afflux');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 1, 19)).discordianDate().celebrateHoliday).toEqual('Chaoflux');
                expect(new Ddate(new Date(2020, 4, 3)).discordianDate().celebrateHoliday).toEqual('Discoflux');
                expect(new Ddate(new Date(2020, 6, 15)).discordianDate().celebrateHoliday).toEqual('Confuflux');
                expect(new Ddate(new Date(2020, 8, 26)).discordianDate().celebrateHoliday).toEqual('Bureflux');
                expect(new Ddate(new Date(2020, 11, 8)).discordianDate().celebrateHoliday).toEqual('Afflux');
              });
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 29)).discordianDate().celebrateHoliday).toEqual(undefined);
              });

              test('Leap Year', () => {
                expect(new Ddate(tibsDay).discordianDate().celebrateHoliday).toEqual("St. Tib's Day");
              });
            });
          });
        });

        describe('en', () => {
          describe('Holidays', () => {
            describe('5', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 0, 5), 'en').discordianDate().celebrateHoliday).toEqual('Mungday');
                expect(new Ddate(new Date(2021, 2, 19), 'en').discordianDate().celebrateHoliday).toEqual('Mojoday');
                expect(new Ddate(new Date(2021, 4, 31), 'en').discordianDate().celebrateHoliday).toEqual('Syaday');
                expect(new Ddate(new Date(2021, 7, 12), 'en').discordianDate().celebrateHoliday).toEqual('Zaraday');
                expect(new Ddate(new Date(2021, 9, 24), 'en').discordianDate().celebrateHoliday).toEqual('Maladay');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 0, 5), 'en').discordianDate().celebrateHoliday).toEqual('Mungday');
                expect(new Ddate(new Date(2020, 2, 19), 'en').discordianDate().celebrateHoliday).toEqual('Mojoday');
                expect(new Ddate(new Date(2020, 4, 31), 'en').discordianDate().celebrateHoliday).toEqual('Syaday');
                expect(new Ddate(new Date(2020, 7, 12), 'en').discordianDate().celebrateHoliday).toEqual('Zaraday');
                expect(new Ddate(new Date(2020, 9, 24), 'en').discordianDate().celebrateHoliday).toEqual('Maladay');
              });
            });

            describe('50', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 19), 'en').discordianDate().celebrateHoliday).toEqual('Chaoflux');
                expect(new Ddate(new Date(2021, 4, 3), 'en').discordianDate().celebrateHoliday).toEqual('Discoflux');
                expect(new Ddate(new Date(2021, 6, 15), 'en').discordianDate().celebrateHoliday).toEqual('Confuflux');
                expect(new Ddate(new Date(2021, 8, 26), 'en').discordianDate().celebrateHoliday).toEqual('Bureflux');
                expect(new Ddate(new Date(2021, 11, 8), 'en').discordianDate().celebrateHoliday).toEqual('Afflux');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 1, 19), 'en').discordianDate().celebrateHoliday).toEqual('Chaoflux');
                expect(new Ddate(new Date(2020, 4, 3), 'en').discordianDate().celebrateHoliday).toEqual('Discoflux');
                expect(new Ddate(new Date(2020, 6, 15), 'en').discordianDate().celebrateHoliday).toEqual('Confuflux');
                expect(new Ddate(new Date(2020, 8, 26), 'en').discordianDate().celebrateHoliday).toEqual('Bureflux');
                expect(new Ddate(new Date(2020, 11, 8), 'en').discordianDate().celebrateHoliday).toEqual('Afflux');
              });
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 29), 'en').discordianDate().celebrateHoliday).toEqual(undefined);
              });

              test('Leap Year', () => {
                expect(new Ddate(tibsDay, 'en').discordianDate().celebrateHoliday).toEqual("St. Tib's Day");
              });
            });
          });
        });

        describe('ru', () => {
          describe('Holidays', () => {
            describe('5', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 0, 5), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Мунга');
                expect(new Ddate(new Date(2021, 2, 19), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Моджо');
                expect(new Ddate(new Date(2021, 4, 31), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Сьядасти');
                expect(new Ddate(new Date(2021, 7, 12), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Заратуда');
                expect(new Ddate(new Date(2021, 9, 24), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Малаклипса');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 0, 5), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Мунга');
                expect(new Ddate(new Date(2020, 2, 19), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Моджо');
                expect(new Ddate(new Date(2020, 4, 31), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Сьядасти');
                expect(new Ddate(new Date(2020, 7, 12), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Заратуда');
                expect(new Ddate(new Date(2020, 9, 24), 'ru').discordianDate().celebrateHoliday).toEqual('День Св. Малаклипса');
              });
            });

            describe('50', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 19), 'ru').discordianDate().celebrateHoliday).toEqual('Хаосец');
                expect(new Ddate(new Date(2021, 4, 3), 'ru').discordianDate().celebrateHoliday).toEqual('Раздинец');
                expect(new Ddate(new Date(2021, 6, 15), 'ru').discordianDate().celebrateHoliday).toEqual('Неразделень');
                expect(new Ddate(new Date(2021, 8, 26), 'ru').discordianDate().celebrateHoliday).toEqual('Бюрокрадень');
                expect(new Ddate(new Date(2021, 11, 8), 'ru').discordianDate().celebrateHoliday).toEqual('Итогец');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 1, 19), 'ru').discordianDate().celebrateHoliday).toEqual('Хаосец');
                expect(new Ddate(new Date(2020, 4, 3), 'ru').discordianDate().celebrateHoliday).toEqual('Раздинец');
                expect(new Ddate(new Date(2020, 6, 15), 'ru').discordianDate().celebrateHoliday).toEqual('Неразделень');
                expect(new Ddate(new Date(2020, 8, 26), 'ru').discordianDate().celebrateHoliday).toEqual('Бюрокрадень');
                expect(new Ddate(new Date(2020, 11, 8), 'ru').discordianDate().celebrateHoliday).toEqual('Итогец');
              });
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 29), 'ru').discordianDate().celebrateHoliday).toEqual(undefined);
              });

              test('Leap Year', () => {
                expect(new Ddate(tibsDay, 'ru').discordianDate().celebrateHoliday).toEqual('День святого Тиба');
              });
            });
          });
        });
      });

      describe('format', () => {
        describe('default', () => {
          test('Parameters', () => {
            const ddateTest = new Ddate(tibsDay);

            expect(ddate.format('Today is %{%A, the %e of %B%}, %Y.%N%nCelebrate %H')).toEqual('Today is Pungenday, the 48th of Chaos, 3189.');
            expect(new Ddate(tibsDay, 'en').format('Today is %{%A, the %e of %B%}, %Y.')).toEqual("Today is St. Tib's Day, 3186.");
            expect(new Ddate(new Date(2021, 0, 5), 'en').format('Today is %{%A, the %e of %B%}, %Y.%N%nCelebrate %H')).toEqual('Today is Setting Orange, the 5th of Chaos, 3187.\nCelebrate Mungday');

            expect(ddateTest.format('%A')).toEqual('Setting Orange');
            expect(ddateTest.format('%a')).toEqual('SO');
            expect(ddateTest.format('%B')).toEqual('Chaos');
            expect(ddateTest.format('%b')).toEqual('Chs');
            expect(new Ddate(new Date(2020, 3, 29)).format('%D')).toEqual('119');
            expect(new Ddate(new Date(2020, 3, 29)).format('%d')).toEqual('46');
            expect(ddateTest.format('%e')).toEqual('60th');
            expect(ddateTest.format('%H')).toEqual("St. Tib's Day");
            expect(new Ddate(new Date(2021, 1, 29)).format('%H')).toEqual('');
            expect(ddateTest.format('%N')).toEqual('');
            expect(ddateTest.format('%n')).toEqual('\n');
            expect(ddateTest.format('%t')).toEqual("\t");
            expect(ddateTest.format('Holiday: %{%H')).toEqual("Holiday: St. Tib's Day");
            expect(new Ddate(new Date(2021, 1, 29)).format('Holiday: %{%H')).toEqual('Holiday: ');
            expect(ddateTest.format('%.')).toEqual("I've nothing to say to you. (yet)");
            expect(ddateTest.format('%Y')).toEqual('3186');
          });

          describe('Holidays', () => {
            describe('5', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 0, 5)).format('%H')).toEqual('Mungday');
                expect(new Ddate(new Date(2021, 2, 19)).format('%H')).toEqual('Mojoday');
                expect(new Ddate(new Date(2021, 4, 31)).format('%H')).toEqual('Syaday');
                expect(new Ddate(new Date(2021, 7, 12)).format('%H')).toEqual('Zaraday');
                expect(new Ddate(new Date(2021, 9, 24)).format('%H')).toEqual('Maladay');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 0, 5)).format('%H')).toEqual('Mungday');
                expect(new Ddate(new Date(2020, 2, 19)).format('%H')).toEqual('Mojoday');
                expect(new Ddate(new Date(2020, 4, 31)).format('%H')).toEqual('Syaday');
                expect(new Ddate(new Date(2020, 7, 12)).format('%H')).toEqual('Zaraday');
                expect(new Ddate(new Date(2020, 9, 24)).format('%H')).toEqual('Maladay');
              });
            });

            describe('50', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 19)).format('%H')).toEqual('Chaoflux');
                expect(new Ddate(new Date(2021, 4, 3)).format('%H')).toEqual('Discoflux');
                expect(new Ddate(new Date(2021, 6, 15)).format('%H')).toEqual('Confuflux');
                expect(new Ddate(new Date(2021, 8, 26)).format('%H')).toEqual('Bureflux');
                expect(new Ddate(new Date(2021, 11, 8)).format('%H')).toEqual('Afflux');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 1, 19)).format('%H')).toEqual('Chaoflux');
                expect(new Ddate(new Date(2020, 4, 3)).format('%H')).toEqual('Discoflux');
                expect(new Ddate(new Date(2020, 6, 15)).format('%H')).toEqual('Confuflux');
                expect(new Ddate(new Date(2020, 8, 26)).format('%H')).toEqual('Bureflux');
                expect(new Ddate(new Date(2020, 11, 8)).format('%H')).toEqual('Afflux');
              });
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 29)).format('%H')).toEqual('');
              });

              test('Leap Year', () => {
                expect(new Ddate(tibsDay).format('%H')).toEqual("St. Tib's Day");
              });
            });
          });
        });

        describe('en', () => {
          test('Parameters', () => {
            const ddateTest = new Ddate(tibsDay, 'en');

            expect(ddateEn.format('Today is %{%A, the %e of %B%}, %Y.%N%nCelebrate %H')).toEqual('Today is Pungenday, the 48th of Chaos, 3189.');
            expect(ddateTest.format('Today is %{%A, the %e of %B%}, %Y.')).toEqual("Today is St. Tib's Day, 3186.");
            expect(new Ddate(new Date(2021, 0, 5), 'en').format('Today is %{%A, the %e of %B%}, %Y.%N%nCelebrate %H')).toEqual('Today is Setting Orange, the 5th of Chaos, 3187.\nCelebrate Mungday');
          
            expect(ddateTest.format('%A')).toEqual('Setting Orange');
            expect(ddateTest.format('%a')).toEqual('SO');
            expect(ddateTest.format('%B')).toEqual('Chaos');
            expect(ddateTest.format('%b')).toEqual('Chs');
            expect(new Ddate(new Date(2020, 3, 29), 'en').format('%D')).toEqual('119');
            expect(new Ddate(new Date(2020, 3, 29), 'en').format('%d')).toEqual('46');
            expect(ddateTest.format('%e')).toEqual('60th');
            expect(ddateTest.format('%H')).toEqual("St. Tib's Day");
            expect(new Ddate(new Date(2021, 1, 29), 'en').format('%H')).toEqual('');
            expect(ddateTest.format('%N')).toEqual('');
            expect(ddateTest.format('%n')).toEqual('\n');
            expect(ddateTest.format('%t')).toEqual("\t");
            expect(ddateTest.format('Holiday: %{%H')).toEqual("Holiday: St. Tib's Day");
            expect(new Ddate(new Date(2021, 1, 29), 'en').format('Holiday: %{%H')).toEqual('Holiday: ');
            expect(ddateTest.format('%.')).toEqual("I've nothing to say to you. (yet)");
            expect(ddateTest.format('%Y')).toEqual('3186');
          });

          describe('Holidays', () => {
            describe('5', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 0, 5), 'en').format('%H')).toEqual('Mungday');
                expect(new Ddate(new Date(2021, 2, 19), 'en').format('%H')).toEqual('Mojoday');
                expect(new Ddate(new Date(2021, 4, 31), 'en').format('%H')).toEqual('Syaday');
                expect(new Ddate(new Date(2021, 7, 12), 'en').format('%H')).toEqual('Zaraday');
                expect(new Ddate(new Date(2021, 9, 24), 'en').format('%H')).toEqual('Maladay');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 0, 5), 'en').format('%H')).toEqual('Mungday');
                expect(new Ddate(new Date(2020, 2, 19), 'en').format('%H')).toEqual('Mojoday');
                expect(new Ddate(new Date(2020, 4, 31), 'en').format('%H')).toEqual('Syaday');
                expect(new Ddate(new Date(2020, 7, 12), 'en').format('%H')).toEqual('Zaraday');
                expect(new Ddate(new Date(2020, 9, 24), 'en').format('%H')).toEqual('Maladay');
              });
            });

            describe('50', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 19), 'en').format('%H')).toEqual('Chaoflux');
                expect(new Ddate(new Date(2021, 4, 3), 'en').format('%H')).toEqual('Discoflux');
                expect(new Ddate(new Date(2021, 6, 15), 'en').format('%H')).toEqual('Confuflux');
                expect(new Ddate(new Date(2021, 8, 26), 'en').format('%H')).toEqual('Bureflux');
                expect(new Ddate(new Date(2021, 11, 8), 'en').format('%H')).toEqual('Afflux');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 1, 19), 'en').format('%H')).toEqual('Chaoflux');
                expect(new Ddate(new Date(2020, 4, 3), 'en').format('%H')).toEqual('Discoflux');
                expect(new Ddate(new Date(2020, 6, 15), 'en').format('%H')).toEqual('Confuflux');
                expect(new Ddate(new Date(2020, 8, 26), 'en').format('%H')).toEqual('Bureflux');
                expect(new Ddate(new Date(2020, 11, 8), 'en').format('%H')).toEqual('Afflux');
              });
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 29), 'en').format('%H')).toEqual('');
              });

              test('Leap Year', () => {
                expect(new Ddate(tibsDay, 'en').format('%H')).toEqual("St. Tib's Day");
              });
            });
          });
        });

        describe('ru', () => {
          test('Parameters', () => {
            const ddateTest = new Ddate(tibsDay, 'ru')

            expect(ddateRu.format('Сегодня %{%A, %e день %B%}, %Y.%N%nПраздник %H')).toEqual('Сегодня Остреда, 48й день Хаоса, 3189.');
            expect(new Ddate(tibsDay, 'ru').format('Сегодня %{%A, %e день %B%}, %Y.')).toEqual('Сегодня День святого Тиба, 3186.');
            expect(new Ddate(new Date(2021, 0, 5), 'ru').format('Сегодня %{%A, %e день %B%}, %Y.%N%nПраздник %H')).toEqual('Сегодня Апельсинница, 5й день Хаоса, 3187.\nПраздник День Св. Мунга');

            expect(ddateTest.format('%A')).toEqual('Апельсинница');
            expect(ddateTest.format('%a')).toEqual('АП');
            expect(ddateTest.format('%B')).toEqual('Хаоса');
            expect(ddateTest.format('%b')).toEqual('ХС');
            expect(new Ddate(new Date(2020, 3, 29), 'ru').format('%D')).toEqual('119');
            expect(new Ddate(new Date(2020, 3, 29), 'ru').format('%d')).toEqual('46');
            expect(ddateTest.format('%e')).toEqual('60й');
            expect(ddateTest.format('%H')).toEqual('День святого Тиба');
            expect(new Ddate(new Date(2021, 1, 29), 'ru').format('%H')).toEqual('');
            expect(ddateTest.format('%N')).toEqual('');
            expect(ddateTest.format('%n')).toEqual('\n');
            expect(ddateTest.format('%t')).toEqual("\t");
            expect(ddateTest.format('%{%H')).toEqual('День святого Тиба');
            expect(new Ddate(new Date(2021, 1, 29), 'ru').format('%{%H')).toEqual('');
            expect(ddateTest.format('%.')).toEqual('Мне нечего тебе сказать. (Пока что)');
            expect(ddateTest.format('%Y')).toEqual('3186');
          });

          describe('Holidays', () => {
            describe('5', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 0, 5), 'ru').format('%H')).toEqual('День Св. Мунга');
                expect(new Ddate(new Date(2021, 2, 19), 'ru').format('%H')).toEqual('День Св. Моджо');
                expect(new Ddate(new Date(2021, 4, 31), 'ru').format('%H')).toEqual('День Св. Сьядасти');
                expect(new Ddate(new Date(2021, 7, 12), 'ru').format('%H')).toEqual('День Св. Заратуда');
                expect(new Ddate(new Date(2021, 9, 24), 'ru').format('%H')).toEqual('День Св. Малаклипса');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 0, 5), 'ru').format('%H')).toEqual('День Св. Мунга');
                expect(new Ddate(new Date(2020, 2, 19), 'ru').format('%H')).toEqual('День Св. Моджо');
                expect(new Ddate(new Date(2020, 4, 31), 'ru').format('%H')).toEqual('День Св. Сьядасти');
                expect(new Ddate(new Date(2020, 7, 12), 'ru').format('%H')).toEqual('День Св. Заратуда');
                expect(new Ddate(new Date(2020, 9, 24), 'ru').format('%H')).toEqual('День Св. Малаклипса');
              });
            });

            describe('50', () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 19), 'ru').format('%H')).toEqual('Хаосец');
                expect(new Ddate(new Date(2021, 4, 3), 'ru').format('%H')).toEqual('Раздинец');
                expect(new Ddate(new Date(2021, 6, 15), 'ru').format('%H')).toEqual('Неразделень');
                expect(new Ddate(new Date(2021, 8, 26), 'ru').format('%H')).toEqual('Бюрокрадень');
                expect(new Ddate(new Date(2021, 11, 8), 'ru').format('%H')).toEqual('Итогец');
              });

              test('Leap Year', () => {
                expect(new Ddate(new Date(2020, 1, 19), 'ru').format('%H')).toEqual('Хаосец');
                expect(new Ddate(new Date(2020, 4, 3), 'ru').format('%H')).toEqual('Раздинец');
                expect(new Ddate(new Date(2020, 6, 15), 'ru').format('%H')).toEqual('Неразделень');
                expect(new Ddate(new Date(2020, 8, 26), 'ru').format('%H')).toEqual('Бюрокрадень');
                expect(new Ddate(new Date(2020, 11, 8), 'ru').format('%H')).toEqual('Итогец');
              });
            });

            describe("St. Tib's Day", () => {
              test('Not Leap Year', () => {
                expect(new Ddate(new Date(2021, 1, 29), 'ru').format('%H')).toEqual('');
              });

              test('Leap Year', () => {
                expect(new Ddate(tibsDay, 'ru').format('%H')).toEqual('День святого Тиба');
              });
            });
          });
        });

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


