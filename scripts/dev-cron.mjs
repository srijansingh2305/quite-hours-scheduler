// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const API_URL = "http://localhost:3000/api/quiet-hours/list";
// const TOKEN = process.env.SUPABASE_ACCESS_TOKEN; // Add this in .env

// async function runCron() {
//   console.log("Development CRON started - checking every minute");

//   try {
//     const res = await fetch(API_URL, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("CRON response:", res.status);

//     const data = await res.json();
//     console.log(data);
//   } catch (err) {
//     console.error("CRON error:", err);
//   }
// }

// setInterval(runCron, 60 * 1000); // Every minute

// console.log("Development CRON started - checking every minute");

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
