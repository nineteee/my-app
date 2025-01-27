const express = require("express");
const os = require("os");
const si = require("systeminformation");

const app = express();
app.use(express.json());


function alphabetizeKeys(json) {
  return Object.keys(json)
    .sort()
    .reduce((result, key) => {
      result[key] = json[key];
      return result;
    }, {});
}


function flattenArrays(json) {
  const result = {};
  for (const key in json) {
    if (Array.isArray(json[key])) {
      result[key] = json[key].join(",");
    } else {
      result[key] = json[key];
    }
  }
  return result;
}


app.put("/alpha", (req, res) => {
  const alphabetized = alphabetizeKeys(req.body);
  res.json(alphabetized);
});


app.put("/flatten", (req, res) => {
  const flattened = flattenArrays(req.body);
  res.json(flattened);
});


app.get("/status", async (req, res) => {
  try {
    const mem = process.memoryUsage();
    const totalMem = os.totalmem();
    const usedMemPct = ((mem.heapUsed / totalMem) * 100).toFixed(1);

    const cpu = await si.currentLoad();
    const cpuUsedPct = cpu.currentLoad.toFixed(1);

    res.json({
      "mem-used-pct": parseFloat(usedMemPct),
      "cpu-used-pct": parseFloat(cpuUsedPct),
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch system status." });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`JSON Transformer service running on http://localhost:${PORT}`);
});
