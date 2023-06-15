const fs = require("fs");

const sample_data = {
  device1: {
    20230613: "8.13",
    20230614: "9.44",
    20230615: "10",
  },
  device2: {
    20230613: "8.13",
    20230614: "9.44",
    20230615: "10",
  },
  device3: {
    20230613: "8.13",
    20230614: "9.44",
    20230615: "10",
  },
};

const csv_generator = function (data) {
  return new Promise(function (resolve, reject) {
    const csvRows = [];
    const devices = Object.keys(data);
    const dates = Object.keys(data[devices[0]]);

    // Create the header row
    const headerRow = ["Date", ...devices];
    csvRows.push(headerRow.join(","));

    // Create the data rows
    dates.forEach((date) => {
      const rowData = [date];
      devices.forEach((device) => {
        rowData.push(data[device][date]);
      });
      csvRows.push(rowData.join(","));
    });

    // Create the CSV content
    const csvContent = csvRows.join("\n");

    // Write the CSV content to a file
    fs.writeFile("data.csv", csvContent, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("CSV file has been created successfully.");
      }
    });
  });
};

module.exports = { csv_generator };
