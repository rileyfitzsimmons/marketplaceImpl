var fs = require("fs");

fs.copyFile("build/contracts/Metacoin.json", "../src/contracts/contractInfo.json", (err) => {
  if (err) throw err;
});
