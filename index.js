import express from "express";
import { Telegraf } from "telegraf";

const app = express();

// Ambil token bot dari Railway
const bot = new Telegraf(process.env.BOT_TOKEN);

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

// Pakai webhook, bukan polling
app.use(bot.webhookCallback("/secret-path"));

// Daftarkan webhook ke Telegram
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/secret-path`);

// Endpoint testing
app.get("/", (req, res) => {
  res.send("✅ Bot is running with webhook...");
});

// Jalankan Express
app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server running on port " + (process.env.PORT || 3000));
});
