const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

process.env.VITE_API_URL = "/api";

try {
  execSync("npm run build", { stdio: "inherit" });

  const distPath = path.join(__dirname, "dist");
  if (fs.existsSync(distPath)) {
  } else {
    process.exit(1);
  }
} catch (error) {
  process.exit(1);
}
