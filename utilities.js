const _ = require("lodash");

const rollD6 = () => {
    const x = Math.floor(Math.random() * 6 + 1);
    return x;
  };
  
const getStats = () => {
    const stats = [];
    for (i = 1; i <= 6; i++) {
        let value = [];
        for (j = 1; j <= 4; j++) {
        value.push(rollD6());
        }
        value.splice(value.indexOf(_.min(value)), 1);
        let sum = _.sum(value);
        stats.push(sum);
    }
    return stats;
};

module.exports = {
    rollD6,
    getStats
}

