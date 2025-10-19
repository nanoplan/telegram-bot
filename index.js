import express from "express";
import { Telegraf } from "telegraf";

const app = express();

// Ambil token dari Railway (BOT_TOKEN)
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

// Webhook callback
app.use(bot.webhookCallback("/secret-path"));

// Set webhook (pastikan WEBHOOK_URL ada di Railway Variables)
bot.telegram.setWebhook(process.env.WEBHOOK_URL + "/secret-path");

// Endpoint cek bot
app.get("/", (req, res) => res.send("✅ Bot is running..."));

// Listener Express
app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server running...");
});
