const { Ddate } = require('./ddate');

const a = new Ddate();
console.log(a.format('%e'));
console.log(a.discordianDate());