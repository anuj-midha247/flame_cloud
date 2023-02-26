const TelegramBot = require('node-telegram-bot-api');
const Trello = require('trello');

const telegramToken = '6146717607:AAFhGxGoixbTRB8ZlXs8L0oypPpM1BkBHN4';
const trelloKey = '6deb2785f3cd063f688754f2c9aa1dd8';
const trelloToken = 'ATTAb2b343e7bd7afee634c4cd6edfbf1e5cc1cb83968b17f957fc7fc939e74afaab54DB92E0';

const bot = new TelegramBot(telegramToken, { polling: true });
const trello = new Trello(trelloKey, trelloToken);


bot.onText(/\/boards/, async (msg) => {
    const chatId = msg.chat.id;
  
    try {
      const boards = await trello.getBoards('me');
      const boardNames = boards.map((board) => board.name).join('\n');
      bot.sendMessage(chatId, `Your Trello boards:\n${boardNames}`);
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, 'Oops, something went wrong!');
    }
  });
  
  bot.onText(/\/lists/, async (msg) => {
    const chatId = msg.chat.id;
  
    try {
      const lists = await trello.getListsOnBoard('Trur9Tsy');
      const listNames = lists.map((list) => list.name).join('\n');
      bot.sendMessage(chatId, `Your Trello lists:\n${listNames}`);
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, 'Oops, something went wrong!');
    }
  });
  