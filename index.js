const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = "1448232536177119272";
const SERVER_ID = "13233df32121f4ff";
const UPDATE_INTERVAL = 30000; // 30 seconds

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

let messageToEdit = null;

client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch(CHANNEL_ID);

    // Send the message if it doesn't exist yet
    messageToEdit = await channel.send("Starting server banner updater...");
    console.log("Message created:", messageToEdit.id);

    // Update loop
    setInterval(async () => {
        try {
            const bannerUrl = `https://hvh.wtf/api/servers/${SERVER_ID}/image?${Date.now()}`;

            await messageToEdit.edit({
                content: `**Click to Join Server:**\nhttps://hvh.wtf/servers/${SERVER_ID}`,
                files: [bannerUrl]
            });

            console.log("Updated:", new Date().toISOString());

        } catch (err) {
            console.error("Update failed:", err.message);
        }
    }, UPDATE_INTERVAL);
});

client.login(TOKEN);
