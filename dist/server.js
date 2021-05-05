"use strict";

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _index = _interopRequireDefault(require("./routes/index"));

var _AppError = _interopRequireDefault(require("./errors/AppError"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const porta = process.env.PORT;
app.use(_express.default.json());
app.use(_index.default);
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  });
});
app.listen(porta || 3333, () => {
  if (porta) {
    console.log(`🚀 Server started on port ${porta}!`);
  }

  console.log('🚀 Server started on port 3333!');
});