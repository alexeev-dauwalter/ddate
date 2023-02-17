class Ddate {
  static #lang = {
    ru: {
      seasons: [
        { l: 'Хаоса', s: '' },
        { l: 'Раздора', s: '' },
        { l: 'Замешательства', s: '' },
        { l: 'Бюрократии', s: '' },
        { l: 'Последствий', s: '' }
      ],
      weekday: [
        { l: 'Сладник', s: '' },
        { l: 'Взрывник', s: '' },
        { l: 'Остреда', s: '' },
        { l: 'Колючка-колючка', s: '' },
        { l: 'Апельсинница', s: '' }
      ],
      apostle: [
        "День Св. Мунга", "День Св. Моджо", "День Св. Сьядасти", "День Св. Заратуда", "День Св. Малаклипса"
      ],
      holiday: [
        "Хаосец ", "Раздинец", "Неразделень", "Бюрокрадень", "Итогец"
      ],
      errors: {
        "wrong_type": "Параметр должен быть типа Date",
        "wrong_date": "Неверная дата"
      },
      tibsDay: "День святого Тиба",
      text: ({ isToday, dayOfWeek, seasonDay, season, yold, celebrateHoliday }) => {
        return `${isToday ? 'Сегодня ' : ''}${dayOfWeek}, ${seasonDay} день ${season}, ${yold} YOLD.` +
          (celebrateHoliday ? `Праздник ${celebrateHoliday}` : '');

      }
    },
    en: {
      seasons: [
        { l: 'Chaos', s: 'Chs' },
        { l: 'Discord', s: 'Dsc' },
        { l: 'Confusion', s: 'Cfn' },
        { l: 'Bureaucracy', s: 'Bcy' },
        { l: 'The Aftermath', s: 'Afm' }
      ],
      weekday: [
        { l: 'Sweetmorn', s: 'SM' },
        { l: 'Boomtime', s: 'BT' },
        { l: 'Pungenday', s: 'PD' },
        { l: 'Prickle-Prickle', s: 'PP' },
        { l: 'Setting Orange', s: 'SO' }
      ],
      apostle: [
        "Mungday", "Mojoday", "Syaday", "Zaraday", "Maladay"
      ],
      holiday: [
        "Chaoflux", "Discoflux", "Confuflux", "Bureflux", "Afflux"
      ],
      errors: {
        "wrong_type": "Parameter was not of type Date",
        "wrong_date": "Wrong date"
      },
      tibsDay: "St. Tib's Day",
      text: ({ isToday, dayOfWeek, seasonDay, season, yold, celebrateHoliday }) => {
        return `${isToday ? 'Today is ' : ''}${dayOfWeek}, ${seasonDay} day of ${season}, ${yold} YOLD.` +
          (celebrateHoliday ? `Holyday of ${celebrateHoliday}` : '');
      }
    }
  };

  #locale;

  set locale(value) {
    if (!value) value = "en"

    this.#locale = Ddate.#lang[value];
  }
  get locale() {
    return this.#locale;
  }

  #today;

  set today(value) {
    if (!(value instanceof Date)) {
      throw new Error(Ddate.#locale[this.#locale].errors.wrong_type);
    }

    this.#today = value;
  }
  get today() {
    return this.#today;
  }

  constructor(date, locale) {
    this.locale = locale;
    this.today = date ?? new Date();
    this.day = this.today.getDate();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
  }

  isLeapYear = (date = this.today) => {
    const year = date.getFullYear();

    if ((year & 3) !== 0) return false;

    return ((year % 100) !== 0 || (year % 400) === 0);
  };

  getDayOfYear = (date = this.today) => {
    const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
      mn = date.getMonth();

    let dayOfYear = dayCount[mn] + date.getDate();

    if (mn > 1 && this.isLeapYear(date)) { dayOfYear++; }

    return dayOfYear;
  };

  isToday = (date) => {
    return date.getDate() === this.today.getDate() &&
      date.getMonth() === this.today.getMonth() &&
      date.getFullYear() === this.today.getFullYear();
  };

  discordianDate(date = this.today) {
    const yold = date.getFullYear() + 1166;

    let dayOfYear = this.getDayOfYear(date),
      celebrateHoliday = null;

    if (this.isLeapYear(date)) {
      if (dayOfYear == 60) {
        celebrateHoliday = "День святого Тиба";
      } else if (dayOfYear > 60) {
        dayOfYear--;
      }
    }

    dayOfYear--;

    const divDay = Math.floor(dayOfYear / 73),
      dayOfWeek = this.#locale.weekday[dayOfYear % 5],
      seasonDay = (dayOfYear % 73) + 1,
      season = this.#locale.seasons[divDay];

    if ([5, 50].includes(seasonDay)) {
      celebrateHoliday = seasonDay == 5 ? apostle[divDay] : holiday[divDay];
    }

    if (dayOfWeek === undefined) return new Error(this.#locale.errors.wrong_date);

    const text = this.#locale.text({
      isToday: this.isToday(date),
      dayOfWeek: dayOfWeek.l,
      seasonDay,
      season: season.l,
      yold,
      celebrateHoliday
    });

    return {
      dayOfWeek,
      seasonDay,
      season,
      yold,
      celebrateHoliday,
      text
    }
  }

  format(str, date = this.today) {
    if (!str) return;

    const data = this.discordianDate(date);

    let out = '',
      stopit = false,
      tibsing = false;

    for (let i = 0; i < str.length; i++) {
      if (stopit) break;
      if (str[i] == '%' && str[i + 1] == '}') tibsing = ((i += 2) == Infinity);
      if (tibsing) continue;
      if (str[i] == '%') {
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
          case 'd':
            // TODO: NOT WORK - DAY OF MONTH
            out += this.numricks[2];
            break;
          case 'e':
            // TODO: NOT WORK - DAY OF MONTH
            out += this.numberize(this.numricks[2]);
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
            // TODO: NOT WORK 
            if (this.tabby) tibsing = ((out += "St. Tib's Day") != Infinity);
            break;
          case '.':
            out += "I've nothing to say to you. (yet)";
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
}

module.exports = { Ddate }