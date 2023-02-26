// This code sample uses the 'node-telegram-bot-api' & 'node-trello' library:
const TelegramBot = require('node-telegram-bot-api');
const Trello = require('trello');
const Trello1 = require('node-trello');


//<'Your Telegram BOT Token Goes Here'>
const telegramToken = '6146717607:AAFhGxGoixbTRB8ZlXs8L0oypPpM1BkBHN4'; 

//<'Your Trello API_KEY Token Goes Here'>
const trelloKey = '6deb2785f3cd063f688754f2c9aa1dd8';

//<'Your Trello Token Token Goes Here'>
const trelloToken = 'ATTAb2b343e7bd7afee634c4cd6edfbf1e5cc1cb83968b17f957fc7fc939e74afaab54DB92E0';

const bot = new TelegramBot(telegramToken, { polling: true });
const trello = new Trello(trelloKey, trelloToken);
const trello1 = new Trello1(trelloKey, trelloToken);

// This below code will lists all boards that are connected to the above trello api workspace by command /boards
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
  
  // This below code will lists all lists that are connected to the above trello api workspace by command /lists

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
  
// This below code will create a new board in the trello api workspace by command /createboard

bot.onText(/\/createboard/, (msg) => {
  // Get the chat ID of the user who sent the command
  const chatId = msg.chat.id;
    
trello1.post('/1/boards/', { name: 'New Board' }, async(err, data) => {
    if (err) {
      console.log(err);
      return bot.sendMessage(chatId, 'An error occurred while creating the board.');
    }
    const boardUrl = `${data.url}`;
    bot.sendMessage(chatId, `Board created: ${boardUrl}`);
  });
});


// This below code will delete a  board in the trello api workspace by command /delete_board/<'BoardID'>

bot.onText(/\/delete_board/, (msg, match) => {
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
  

// This below code will add a  card in the trello api workspace by command /add_card/<'BoardID'>

bot.onText(/\/add_card/, async(msg, match) => {
    const boardId = msg.text.replace(/\/add_card\s*/, '');;
    const lists = await trello.getListsOnBoard(boardId);
    const listNames = lists.map((list) => list.id);
    const listId = `${listNames[0]}`;    //<'Your List ID'>
    const cardName = 'New Card Name';
    
    trello1.post(`/1/cards?name=${cardName}&idList=${listId}`, { }, (err, data) => {
      if (err) {
        console.log(err);
        return bot.sendMessage(msg.chat.id, 'An error occurred while adding the card.');
      }
    
      const cardUrl = `https://trello.com/c/${data.shortLink}`;
      bot.sendMessage(msg.chat.id, `Card added: ${cardUrl}`);
    });
});
  
// This below code will delete a  board in the trello api workspace by command /remove_board/<'CardID'>

bot.onText(/\/remove_card/, (msg, match) => {
    const cardId = msg.text.replace(/\/remove_card\s*/, '');

trello1.del(`/1/cards/${cardId}`, {}, (err, data) => {
  if (err) {
    console.log(err);
    return bot.sendMessage(msg.chat.id, 'An error occurred while removing the card.');
  }

  bot.sendMessage(msg.chat.id, 'Card removed.');
});
  });
  
  
