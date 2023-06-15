const { get_access_token } = require("./get_access_token");
const { listAllDevices } = require("./listAllDevices");
const { csv_generator } = require("./csv_generator");

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

  const list_of_devices = await listAllDevices(access_token);

  let data = {};
  const start_date = "20230612";
  const end_date = "20230615";
  let promises = [];

  list_of_devices.forEach((device) => {
    let device_id = device.id;
    let name = device.name;

    promises.push(
      daily_energy(access_token, device_id, start_date, end_date).then(
        (daily_energy_data) => {
          data[name] = daily_energy_data;
        }
      )
    );
  });

  return Promise.all(promises).then(async (done) => {
    const sortedKeys = Object.keys(data).sort((a, b) => {
      const plugNumberA = parseInt(a.match(/\d+/)[0]);
      const plugNumberB = parseInt(b.match(/\d+/)[0]);
      return plugNumberA - plugNumberB;
    });
    const sortedData = {};
    sortedKeys.forEach((key) => {
      sortedData[key] = data[key];
    });
    res = await csv_generator(sortedData);
    console.log(res);
  });

  //const energy_data = await get_total_energy(access_token, device_id);
  //console.log(energy_data);
  //const electric_data = await get_electric_data(access_token, device_id);
  //console.log(electric_data);
  //const monthly_data = await monthly_energy(access_token, device_id);
  //console.log(monthly_data);
  //const daily_data = await daily_energy(access_token, device_id);
  //console.log(daily_data);
};

main();

//module.exports={execute};
