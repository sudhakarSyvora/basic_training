const fs = require("fs");
const url = "https://dummy.restapiexample.com/api/v1/employee/1";

(async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const resData = await response.json();
    const timestamp = Date.now();
    const filename = `output/${timestamp}_employee_${resData.data.id}.txt`;
    if (!fs.existsSync("output")) {
      fs.mkdirSync("output");
    }
    fs.writeFile(
      filename,
      JSON.stringify(resData?.data, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log(`Data saved in ${filename}`);
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
})();
 