const TelegramBot = require("node-telegram-bot-api");
const BotToken = process.env.TELEGRAM_BOT_TOKEN;
const startCommand = require("../controller/startCommand"); // This is helper Function For Command /start
const logoutCommand = require("../controller/logoutCommand"); // This is Helper Function For Command /logout
const createBoardCommand = require("../controller/createBoardCommand"); // This is Helper Function For Command /createboard
const showBoardCommand = require("../controller/showBoardCommand"); // This is Helper Function For Command /showboard
const deleteBoardCommand = require("../controller/deleteBoardCommand"); // This is Helper Function For Command /deleteboard
const setBoardCommand = require("../controller/setBoardCommand"); // This is Helper Function For Command /set_*
const setBoardHelper = require("../controller/setBoardHelper"); // This is Helper Function For Command /setboard
const newCardCommand = require("../controller/newCardCommand"); // This is Helper Function For Command /newcard
const deleteCardCommand = require("../controller/deleteCardCommand"); // This is Helper Function For Command /deletecard
const showAllCardCommand = require("../controller/showAllCardCommand"); // This is Helper Function For Command /showallcards
// using TelegramBot Cosntructor To Create bot Object With Polling Enabled
const bot = new TelegramBot(BotToken || "", { polling: true });

function registerEvents() {
  // Code Of /start command To Start Authorization Process .
  bot.onText(/\/start/, (msg) => {
    startCommand(msg, bot);
  });
  // Code of /logout Command To logout The Trello Account From Telegram
  bot.onText(/\/logout/, (msg) => {
    logoutCommand(msg, bot);
  });

  // All Code Of Commands Related To Board Like  /createboard /boards /deleteboard /delete_* /setboard /set_* /editboard.
  bot.onText(/\/createboard/, (msg) => {
    createBoardCommand(msg, bot);
  });
  bot.onText(/\/showboard/, (msg) => {
    showBoardCommand(msg, bot);
  });
  bot.onText(/\/deleteboard/, (msg) => {
    deleteBoardCommand(msg, bot);
  });
  bot.onText(/\/setboard/, (msg) => {
    setBoardCommand(msg, bot);
  });
  bot.onText(/^\/set_.*/, (msg) => {
    setBoardHelper(msg, bot);
  });

  // All Code Of Commands Related To Card Like  /newcard  /deletecard /showallcards.
  bot.onText(/\/newcard/, (msg) => {
    newCardCommand(msg, bot);
  });
  bot.onText(/\/deletecard/, (msg) => {
    deleteCardCommand(msg, bot);
  });
  bot.onText(/\/showallcards/, (msg) => {
    showAllCardCommand(msg, bot);
  });
}
module.exports = registerEvents;
