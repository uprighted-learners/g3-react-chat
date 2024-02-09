const sendErrorResponse = (error, res) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: 'Internal server error",
    error,
  }
};

module.exports = sendErrorResponse;