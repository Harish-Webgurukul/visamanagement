exports.successResponse = (res, message, data = null) => {
  return res.json({
    success: true,
    message,
    data,
  });
};

exports.errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};






