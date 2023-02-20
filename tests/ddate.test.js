const { Ddate } = require("../src/ddate");

describe("Ddate", () => {
  const ddate = new Ddate(new Date(2023, 1, 17)),
    ddateEn = new Ddate(new Date(2023, 1, 17), "en"),
    ddateRu = new Ddate(new Date(2023, 1, 17), "ru");

  describe("Non static", () => {
    describe("Properties", () => {
      test("initialize", () => {
        expect(ddate instanceof Ddate).toBeTruthy();
        expect(ddateEn instanceof Ddate).toBeTruthy();
        expect(ddateRu instanceof Ddate).toBeTruthy();
      });

      describe("locale", () => {
        test("default", () => {
          expect(ddate.locale).toEqual("en");
        });

        test("en", () => {
          expect(ddateEn.locale).toEqual("en");
        });

        test("ru", () => {
          expect(ddateRu.locale).toEqual("ru");
        });
      });

      test("today", () => {
        expect(ddate.today instanceof Date).toBeTruthy();
        expect(ddate.today).toEqual(new Date(2023, 1, 17));
      });

      test("text", () => {
        expect(ddate.discordianDate().text).toEqual(
          "Today is Pungenday, the 48th day of Chaos in the YOLD 3189"
        );
      });
    });

    describe("Methods", () => {
      test("isLeapYear", () => {
        expect(Ddate.isLeapYear(ddate.today)).toBeFalsy();
        expect(Ddate.isLeapYear(new Date(2020, 1, 1))).toBeTruthy();
      });

      test("isToday", () => {
        expect(ddate.isToday(new Date(2023, 1, 17))).toBeTruthy();
        expect(ddate.isToday(new Date(2023, 1, 18))).toBeFalsy();
      });

      test("getDayOfYear", () => {
        expect(Ddate.getDayOfYear(new Date(2023, 1, 17))).toEqual(48);
      });

      describe("discordianDate", () => {
        test("en", () => {});

        test("ru", () => {});
      });

      describe("format", () => {
        test("default", () => {
          expect(ddate.format("Today is %{%A, the %e of %B%}, %Y.")).toEqual(
            "Today is Pungenday, the 48th of Chaos, 3189."
          );
        });

        test("en", () => {
          expect(ddateEn.format("Today is %{%A, the %e of %B%}, %Y.")).toEqual(
            "Today is Pungenday, the 48th of Chaos, 3189."
          );
        });

        test("ru", () => {
          expect(ddateRu.format("Сегодня %{%A, %e день %B%}, %Y.")).toEqual(
            "Сегодня Остреда, 48й день Хаоса, 3189."
          );
        });
      });

      describe("_numberize", () => {
        test("default", () => {
          expect(ddate._numberize("48")).toEqual("48th");
        });

        test("en", () => {
          expect(ddateEn._numberize("48")).toEqual("48th");
        });

        test("ru", () => {
          expect(ddateRu._numberize("48")).toEqual("48й");
        });
      });
    });
  });

  describe("Static", () => {
    describe("Properties", () => {
      test("", () => {});
    });

    describe("Methods", () => {
      test("", () => {});
    });
  });
});
