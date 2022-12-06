const formDataStringConvert = (target) => (req, res, next) => {
  const body = JSON.parse(req.body[target]);
  req.body = body;
  return next();
};

module.exports = { formDataStringConvert };
