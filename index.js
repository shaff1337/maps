const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
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

    // Create initial embed
    const initialEmbed = new EmbedBuilder()
        .setTitle("Click to Join Server")
        .setURL(`https://hvh.wtf/servers/${SERVER_ID}`)
        .setImage(`https://hvh.wtf/api/servers/${SERVER_ID}/image?t=${Date.now()}`)
        .setColor(0x00AE86)
        .setTimestamp();

    // Send the message if it doesn't exist yet
    messageToEdit = await channel.send({ embeds: [initialEmbed] });
    console.log("Message created:", messageToEdit.id);

    // Update loop
    setInterval(async () => {
        try {
            const updatedEmbed = EmbedBuilder.from(initialEmbed)
                .setImage(`https://hvh.wtf/api/servers/${SERVER_ID}/image?t=${Date.now()}`)
                .setTimestamp(); // optional: updates timestamp to show freshness

            await messageToEdit.edit({ embeds: [updatedEmbed] });
            console.log("Updated:", new Date().toISOString());

        } catch (err) {
            console.error("Update failed:", err.message);
        }
    }, UPDATE_INTERVAL);
});

client.login(TOKEN);
