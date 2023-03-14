class Ddate {
  static #dictionary = {
    ru: {
      texts: {
        nothing_say: 'Мне нечего тебе сказать. (Пока что)',
      },
      seasons: [
        { l: 'Хаоса', s: 'ХС' },
        { l: 'Раздора', s: 'РЗ' },
        { l: 'Замешательства', s: 'ЗМ' },
        { l: 'Бюрократии', s: 'БР' },
        { l: 'Последствий', s: 'ПС' },
      ],
      weekday: [
        { l: 'Сладник', s: 'СЛ' },
        { l: 'Взрывник', s: 'ВЗ' },
        { l: 'Остреда', s: 'ОС' },
        { l: 'Колючка-колючка', s: 'КК' },
        { l: 'Апельсинница', s: 'АП' },
      ],
      apostle: [
        'День Св. Мунга',
        'День Св. Моджо',
        'День Св. Сьядасти',
        'День Св. Заратуда',
        'День Св. Малаклипса',
      ],
      holiday: ['Хаосец', 'Раздинец', 'Неразделень', 'Бюрокрадень', 'Итогец'],
      errors: {
        wrong_type: 'Параметр должен быть типа Date',
      },
      tibsDay: 'День святого Тиба',
      text: ({
        isToday,
        dayOfWeek,
        seasonDay,
        season,
        yold,
        celebrateHoliday,
      }) => {
        return `${isToday ? 'Сегодня ' : ''}${dayOfWeek}, ${seasonDay} день ${season}, YOLD ${yold}.${celebrateHoliday ? ` Праздник ${celebrateHoliday}.` : ''}`;
      },
      numberize: (num) => {
        return (num += 'й');
      },
    },
    en: {
      texts: {
        nothing_say: "I've nothing to say to you. (yet)",
      },
      seasons: [
        { l: 'Chaos', s: 'Chs' },
        { l: 'Discord', s: 'Dsc' },
        { l: 'Confusion', s: 'Cfn' },
        { l: 'Bureaucracy', s: 'Bcy' },
        { l: 'The Aftermath', s: 'Afm' },
      ],
      weekday: [
        { l: 'Sweetmorn', s: 'SM' },
        { l: 'Boomtime', s: 'BT' },
        { l: 'Pungenday', s: 'PD' },
        { l: 'Prickle-Prickle', s: 'PP' },
        { l: 'Setting Orange', s: 'SO' },
      ],
      apostle: ['Mungday', 'Mojoday', 'Syaday', 'Zaraday', 'Maladay'],
      holiday: ['Chaoflux', 'Discoflux', 'Confuflux', 'Bureflux', 'Afflux'],
      errors: {
        wrong_type: 'Parameter was not of type Date',
      },
      tibsDay: "St. Tib's Day",
      text: ({
        isToday,
        dayOfWeek,
        seasonDay,
        season,
        yold,
        celebrateHoliday,
      }) => {
        return `${isToday ? 'Today is ' : ''}${dayOfWeek}, the ${seasonDay} day of ${season} in the YOLD ${yold}.${celebrateHoliday ? ` Holiday of ${celebrateHoliday}.` : ''}`;
      },
      numberize: (num) => {
        const dec = (num % 100) > 9 && (num % 100) < 15,
          declination = ['st', 'nd', 'rd', 'th'];

        return num += declination[num % 10 >= 1 && num % 10 <= 4 && !dec ? num % 10 - 1 : 3];
      },
    },
  };

  static #dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  #locale;
  #today;

  set locale(value) {
    if (!Object.keys(Ddate.#dictionary).includes(value)) value = 'en';

    this.#locale = value;
  }

  get locale() {
    return this.#locale;
  }

  set today(value) {
    if (!(value instanceof Date)) {
      throw new Error(Ddate.#dictionary[this.locale].errors.wrong_type);
    }

    this.day = value.getDate();
    this.month = value.getMonth();
    this.year = value.getFullYear();

    this.#today = value;
  }

  get today() {
    return this.#today;
  }

  // TODO: Overloading the constructor to create a date from a discordian date string
  constructor(date, locale) {
    this.locale = locale;
    this.today = date ?? new Date();
  }

  static isLeapYear(date = this.today) {
    const year = date.getFullYear();

    if ((year & 3) !== 0) return false;

    return year % 100 !== 0 || year % 400 === 0;
  }

  static getDayOfYear(date = this.today) {
    const mn = date.getMonth();

    let dayOfYear = this.#dayCount[mn] + date.getDate();

    return dayOfYear;
  }

  isToday(date) {
    return (
      date.getDate() === this.day &&
      date.getMonth() === this.month &&
      date.getFullYear() === this.year
    );
  }

  discordianDate(date = this.today) {
    const yold = date.getFullYear() + 1166;

    let dayOfYear = Ddate.getDayOfYear(date),
      celebrateHoliday;

    const divDay = Math.floor(dayOfYear / 73),
      dayOfWeek = Ddate.#dictionary[this.locale].weekday[(dayOfYear - 1) % 5],
      seasonDay = dayOfYear % 73 === 0 ? dayOfYear : dayOfYear % 73,
      season = Ddate.#dictionary[this.locale].seasons[divDay];

    if ([5, 50].includes(seasonDay)) {
      celebrateHoliday = Ddate.#dictionary[this.locale][seasonDay === 5 ? 'apostle' : 'holiday'][divDay];
    } else if (Ddate.isLeapYear(date) && dayOfYear === 60) {
      celebrateHoliday = Ddate.#dictionary[this.locale].tibsDay;
    }

    const text = Ddate.#dictionary[this.locale].text({
      isToday: this.isToday(date),
      dayOfWeek: dayOfWeek.l,
      seasonDay: this._numberize(seasonDay),
      season: season.l,
      yold,
      celebrateHoliday,
    });

    return {
      dayOfYear,
      dayOfWeek,
      seasonDay,
      season,
      yold,
      celebrateHoliday,
      text,
    };
  }

  format(str, date = this.today) {
    if (!str) return;

    const data = this.discordianDate(date),
      tabby = data.celebrateHoliday === Ddate.#dictionary[this.locale].tibsDay;

    let out = '',
      stopit = false,
      tibsing = false;

    for (let i = 0; i < str.length; i++) {
      if (stopit) break;

      if (str[i] === '%' && str[i + 1] === '}') tibsing = (i += 2) === Infinity;

      if (tibsing) continue;

      if (str[i] === '%') {
        switch (str[i + 1]) {
          case 'A':
            out += data.dayOfWeek.l;
            break;
          case 'a':
            out += data.dayOfWeek.s;
            break;
          case 'B':
            out += data.season.l;
            break;
          case 'b':
            out += data.season.s;
            break;
          case 'D':
            out += data.dayOfYear;
            break;
          case 'd':
            out += data.seasonDay;
            break;
          case 'e':
            out += this._numberize(data.seasonDay);
            break;
          case 'H':
            out += data.celebrateHoliday || '';
            break;
          case 'N':
            stopit = !Boolean(data.celebrateHoliday);
            break;
          case 'n':
            out += '\n';
            break;
          case 't':
            out += '\t';
            break;
          case '{':
            if (tabby) tibsing = (out += Ddate.#dictionary[this.locale].tibsDay) !== Infinity;
            break;
          case '.':
            out += Ddate.#dictionary[this.locale].texts.nothing_say;
            break;
          case 'Y':
            out += data.yold;
            break;
          default:
            out += str[i];
            break;
        }

        i++;
      } else {
        out += str[i];
      }
    }

    return out;
  }

  _numberize(num) {
    return Ddate.#dictionary[this.locale].numberize(num);
  }
}

module.exports = { Ddate };
