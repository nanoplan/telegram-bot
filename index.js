import express from "express";
import { Telegraf } from "telegraf";

const app = express();

// Masukkan token bot kamu dari BotFather
const bot = new Telegraf(process.env.8348753672:AAHsGp3ri7vSdkPOuPVW7Z2AmSRkg_FiK_M);

// Command /start
bot.start((ctx) => {
  ctx.reply(
    "🚀 Welcome to *Tonnect App*!",
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Open App", url: "https://tonnect2025.vercel.app" }],
          [{ text: "👥 Join the community", url: "https://t.me/Tonnect_Real" }]
        ]
      }
    }
  );
});

// Aktifkan webhook (supaya bisa jalan di Railway)
app.use(bot.webhookCallback('/secret-path'));

// Jalankan bot webhook
bot.telegram.setWebhook(process.env.WEBHOOK_URL + "/secret-path");

// Listener Express
app.get("/", (req, res) => res.send("Bot is running..."));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
