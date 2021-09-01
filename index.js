const TelegramApi = require('node-telegram-bot-api')


const token = '1904355409:AAHy7GyOlhKtA8eZNCCoWJ6cJCl2ZP6ILXM'

const bot = new TelegramApi(token, {polling: true})

// const chats = {}

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
        if (text === '/start') {
            await UserModel.create({chatId})
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот автора ютуб канала ULBI TV`);
        }
        if (text === '/info') {
            const user = await UserModel.findOne({chatId})
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}, в игре у тебя правильных ответов ${user.right}, неправильных ${user.wrong}`);
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
    } catch (e) {
        return bot.sendMessage(chatId, 'Произошла какая то ошибочка!)');
    }

})