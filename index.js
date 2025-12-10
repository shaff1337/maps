const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle 
} = require("discord.js");

const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = "1448232536177119272";
const SERVER_ID = "13233df32121f4ff";
const UPDATE_INTERVAL = 30000; // 30 seconds
const STEAM_REDIRECT = "https://tinyurl.com/jufbvt54";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

let messageToEdit = null;

client.once("clientReady", async () => { // Discord.js v15+
    console.log(`Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch(CHANNEL_ID);

    // Create initial embed
    const embed = new EmbedBuilder()
        .setTitle("Server Info/Status")
        .setURL(`https://hvh.wtf/servers/${SERVER_ID}`)
        .setImage(`https://hvh.wtf/api/servers/${SERVER_ID}/image?t=${Date.now()}`)
        .setColor(0x00AE86)
        .setTimestamp();

    // Create button
    const button = new ButtonBuilder()
        .setLabel("Connect via Steam")
        .setStyle(ButtonStyle.Link)
        .setURL(STEAM_REDIRECT);

    const row = new ActionRowBuilder().addComponents(button);

    // Send the message
    messageToEdit = await channel.send({ embeds: [embed], components: [row] });
    console.log("Message created:", messageToEdit.id);

    // Update loop for banner
    setInterval(async () => {
        try {
            const updatedEmbed = EmbedBuilder.from(embed)
                .setImage(`https://hvh.wtf/api/servers/${SERVER_ID}/image?t=${Date.now()}`)
                .setTimestamp();

            await messageToEdit.edit({ embeds: [updatedEmbed], components: [row] });
            console.log("Updated:", new Date().toISOString());

        } catch (err) {
            console.error("Update failed:", err.message);
        }
    }, UPDATE_INTERVAL);
});

client.login(TOKEN);
