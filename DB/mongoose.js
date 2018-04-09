const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var connectPath, options;
//Check if we are on Heroku
if (process.env.PORT) {
  connectPath = "mongodb://ankitbookbash>@ds241039.mlab.com:41039/bookbash";
  options = {
    auth: {
      user: "ankitbookbash",
      password: "ankitbookbash123"
    }
  };
} else {
  connectPath = "mongodb://localhost:27017/Bookbash";
  options = {};
}
mongoose.connect(connectPath, options).then(() => {
  console.log("Database Connected");
});
module.exports = { mongoose };
