const { errorResponse } = require("../utils/response");

const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  return errorResponse(res, err.message || "Internal Server Error", err.statusCode || 500);
};

module.exports = errorHandler;
