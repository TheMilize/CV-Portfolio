// Единственная serverless-функция: только /api/* попадает сюда.
// Статика (/) отдаётся из outputDirectory "dist".
const app = require("../packages/backend/dist/index.js").default;
module.exports = app;
