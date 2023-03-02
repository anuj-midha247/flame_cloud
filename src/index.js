require("dotenv").config();
const connectTOMongoose = require("./config/db.config");
const BotEvents = require("./utils/bot");
// Connecte To Database by this

connectTOMongoose();  


// To Register All Telegram Bot Related Events .

BotEvents();
