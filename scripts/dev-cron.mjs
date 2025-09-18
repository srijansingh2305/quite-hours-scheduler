import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function runCron() {
  console.log("Development CRON started");

  const res = await fetch("http://localhost:3000/api/quiet-hours/list", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TEMP_ACCESS_TOKEN}`,
    },
  });

  const result = await res.json();
  console.log("CRON response:", res.status, result);
}

runCron();
