import express from "express";
import { Telegraf } from "telegraf";

const app = express();

// ✅ Ambil token bot dari Railway (Pastikan BOT_TOKEN sudah diisi di Variables)
const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ Command /start
bot.start((ctx) => {
  ctx.reply("🚀 Welcome to *Tonnect App*!", {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 Open App", url: "https://tonnect2025.vercel.app" }],
        [{ text: "👥 Join the community", url: "https://t.me/Tonnect_Real" }]
      ]
    }
  });
});

// ✅ Webhook handler (jalan di /secret-path)
app.use(bot.webhookCallback("/secret-path"));

// ✅ Daftarkan webhook ke Telegram
if (process.env.WEBHOOK_URL) {
  bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/secret-path`);
  console.log(`🔗 Webhook set to ${process.env.WEBHOOK_URL}/secret-path`);
} else {
  console.error("❌ WEBHOOK_URL belum diset di Railway Variables");
}

// ✅ Endpoint testing
app.get("/", (req, res) => {
  res.send("✅ Bot is running with webhook...");
});

// ✅ Jalankan Express (Railway otomatis kasih PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
