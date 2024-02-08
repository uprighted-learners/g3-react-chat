const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Permission denied.',
    });
  }
  next();
};

module.exports = isAdmin;
