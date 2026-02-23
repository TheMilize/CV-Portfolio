"use strict";
// Обработчик /api/* при деплое из packages/backend (Root Directory = packages/backend)
const app = require("../dist/index.js").default;
module.exports = app;
