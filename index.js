import express from "express";
import { Telegraf } from "telegraf";

const app = express();

// ✅ Ambil token bot dari Railway (Pastikan BOT_TOKEN sudah diisi di Variables)
const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ Command /start
bot.start((ctx) => {
  ctx.replyWithPhoto(
    { url: "https://apricot-magnificent-swordtail-537.mypinata.cloud/ipfs/bafkreihx7dnkeusxzg242devl2oppx5m5nzt7qn3tmvqpjq2js4du564uy" },
    {
      caption: "Welcome to *Tonnect App*! Join Tonnect Mining Carnival - Farm tokens, spin the wheel, refer friends and climb the leadboard in this futuristic Web3 mining carnival",
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 Open App", url: "https://t.me/Tonnect_app_bot/start" }],
          [{ text: "👥 Join the community", url: "https://t.me/Tonnect_Real" }]
        ]
      }
    }
  );
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
