const sendErrorResponse = (error, res) => {
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';
  console.error(error);

  if (res.statusCode) {
    statusCode = res.statusCode;
    errorMessage = res.statusMessage || errorMessage;
  }
  res.status(res.statusCode).json({
    success: false,
    message: errorMessage,
    error: error.message || error,
  });
};

const sendMissingFieldsResponse = (req, res) => {
  return res.status(400).json({
    success: false,
    message: 'Missing required fields',
  });
};

module.exports = sendErrorResponse;
