const { daily_energy } = require("./daily_energy");
const { get_total_energy } = require("./get_total_energy");
const { monthly_energy } = require("./monthly_energy");
const { get_electric_data } = require("./get_electric_data");

module.exports = {
  daily_energy,
  get_total_energy,
  monthly_energy,
  get_electric_data,
};
