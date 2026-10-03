const express = require('express');
const mineflayer = require('mineflayer');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('24/7 AFK Bots Online!'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const SERVER_HOST = 'mastersmp319.mcsh.io';
const SERVER_PORT = 25565;

function startBot(botName, delay) {
  setTimeout(() => {
    console.log(`Connecting ${botName}...`);
    const bot = mineflayer.createBot({
      host: SERVER_HOST,
      port: SERVER_PORT,
      username: botName,
      version: false // Auto-detect server version automatically
    });

    bot.on('spawn', () => {
      console.log(`${botName} connected!`);
      setTimeout(() => bot.chat('/register BotPass123 BotPass123'), 2000);
      setTimeout(() => bot.chat('/login BotPass123'), 4000);

      setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }, 30000);
    });

    bot.on('end', () => {
      console.log(`${botName} disconnected. Reconnecting in 15s...`);
      setTimeout(() => startBot(botName, 0), 15000);
    });

    bot.on('error', (err) => console.log(`${botName} error:`, err));
  }, delay);
}

startBot('AFK_Bot_1', 0);
startBot('AFK_Bot_2', 10000);
