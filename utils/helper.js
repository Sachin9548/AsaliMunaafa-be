const util = require("util");

const error = (err, req, res, next) => {
  if (!err) {
    err = new Error("An error has occurred");
  }
  const code = err.status || 500;

  util.log(util.format("Error [%s]: %s", req.url, err.message));
  if (code !== 404 && code !== 403) {
    util.log(util.inspect(err.stack));
  }

  if (req.xhr || req.isapi) {
    return res.json({
      code: code || 1,
      error: err.message,
      message: err.errorDetails || err.message,
      success: false,
    });
  } else if (err.code === "refreshExpired") {
    return res.status(403).send({
      message: convertJSON(err.message),
      success: false,
    });
  } else {
    // if error is string
    return res.status(400).send({
      message: convertJSON(err.message),
      success: false,
    });
  }
};

module.exports = {
  error,
};