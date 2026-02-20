#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Building for Vercel...");

// Set environment for Vercel
process.env.VITE_API_URL = "/api";

try {
  // Run the build
  execSync("npm run build", { stdio: "inherit" });

  console.log("✅ Build completed successfully");

  // Verify dist directory exists
  const distPath = path.join(__dirname, "dist");
  if (fs.existsSync(distPath)) {
    console.log("📁 Output directory verified:", distPath);
  } else {
    console.error("❌ Output directory not found:", distPath);
    process.exit(1);
  }
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
