const { get_access_token } = require("./get_access_token");

const {
  daily_energy,
  get_total_energy,
  monthly_energy,
  get_electric_data,
} = require("./energy_data");

const httpMethod = "GET";
const device_id = "bfab45bb3d541fe889l9fp";

const main = async function () {
  const access_token = await get_access_token(
    "/v1.0/token?grant_type=1",
    "GET"
  );
  console.log(access_token);
  const energy_data = await get_total_energy(access_token, device_id);
  console.log(energy_data);
  const electric_data = await get_electric_data(access_token, device_id);
  console.log(electric_data);
  const monthly_data = await monthly_energy(access_token, device_id);
  console.log(monthly_data);
  const daily_data = await daily_energy(access_token, device_id);
  console.log(daily_data);
};

main();

//module.exports={execute};
