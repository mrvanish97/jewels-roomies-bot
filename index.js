const { bot } = require('./bot');
require('./web')(bot);
const http = require("http");
setInterval(
  () => http.get(process.env.HEROKU_URL),
  300000
)