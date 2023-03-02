const mongoose = require("mongoose");
let mongoURL = process.env.MONGO_DB_URL; // MongoDB url

async function connect() {
  mongoose.set("strictQuery", false);
  return mongoose.connect(mongoURL).then(() => {
    console.log("Connected To Database");
  })
}

module.exports = connect;
