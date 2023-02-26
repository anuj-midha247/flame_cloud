const TelegramBot = require('node-telegram-bot-api');
const Trello = require('trello');
const Trello1 = require('node-trello');
// const fetch = require('node-fetch');

const telegramToken = '6146717607:AAFhGxGoixbTRB8ZlXs8L0oypPpM1BkBHN4';
const trelloKey = '6deb2785f3cd063f688754f2c9aa1dd8';
const trelloToken = 'ATTAb2b343e7bd7afee634c4cd6edfbf1e5cc1cb83968b17f957fc7fc939e74afaab54DB92E0';

const bot = new TelegramBot(telegramToken, { polling: true });
const trello = new Trello(trelloKey, trelloToken);
const trello1 = new Trello1(trelloKey, trelloToken);


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
  






bot.onText(/\/createboard/, (msg) => {
  // Get the chat ID of the user who sent the command
  const chatId = msg.chat.id;

  // Create a new Trello board
//   trello.addBoard('New Board', (err, board) => {
//     if (err) {
//       bot.sendMessage(chatId, `Error creating board: ${err}`);
//     } else {
//       // Send a message back to the user with a link to the new board
//       bot.sendMessage(chatId, `New board created: https://trello.com/b/${board.shortLink}`);
//     }
//   });
    
trello1.post('/1/boards/', { name: 'New Board' }, async(err, data) => {
    if (err) {
      console.log(err);
      return bot.sendMessage(chatId, 'An error occurred while creating the board.');
    }
    const boardUrl = `https://trello.com/b/${data.shortLink}`;
    bot.sendMessage(chatId, `Board created: ${boardUrl}`);
  });
});

bot.onText(/\/delete_board/, (msg, match) => {
    // Your code here
    // Assume that the user specifies the board ID in the message text
const boardId = msg.text.replace(/\/delete_board\s*/, '');

trello1.del(`/1/boards/${boardId}`, (err, data) => {
  if (err) {
    console.log(err);
    return bot.sendMessage(msg.chat.id, 'An error occurred while deleting the board.');
  }

  bot.sendMessage(msg.chat.id, 'Board deleted successfully.');
});
  });
  
