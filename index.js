const {
    Client,
    GatewayIntentBits,
    PermissionFlagsBits
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// In-memory storage (replace with database later)
const shifts = new Map();
const warnings = new Map();

client.once("ready", () => {
    console.log(`${client.user.tag} is online and running.`);
});

/**
 * SLASH COMMAND HANDLER
 */
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // ---------------- SHIFT SYSTEM ----------------
    if (interaction.commandName === "shift") {
        const action = interaction.options.getString("action");

        if (action === "start") {
            shifts.set(interaction.user.id, Date.now());

            return interaction.reply({
                content: "✅ Shift started successfully.",
                ephemeral: true
            });
        }

        if (action === "end") {
            if (!shifts.has(interaction.user.id)) {
                return interaction.reply({
                    content: "❌ You are not currently on shift.",
                    ephemeral: true
                });
            }

            const start = shifts.get(interaction.user.id);
            const minutes = Math.floor((Date.now() - start) / 60000);

            shifts.delete(interaction.user.id);

            return interaction.reply({
                content: `🛑 Shift ended. You worked **${minutes} minutes**.`
            });
        }
    }

    // ---------------- WARN SYSTEM ----------------
    if (interaction.commandName === "warn") {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: "❌ You do not have permission.",
                ephemeral: true
            });
        }

        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        if (!warnings.has(user.id)) warnings.set(user.id, []);
        warnings.get(user.id).push({
            reason,
            moderator: interaction.user.tag,
            date: new Date().toISOString()
        });

        return interaction.reply(`⚠️ ${user.tag} has been warned for: **${reason}**`);
    }

    // ---------------- PROMOTION ----------------
    if (interaction.commandName === "promote") {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "❌ No permission.",
                ephemeral: true
            });
        }

        const user = interaction.options.getUser("user");
        const rank = interaction.options.getString("rank");

        return interaction.reply(`🎉 ${user.tag} has been promoted to **${rank}**.`);
    }

    // ---------------- STATS ----------------
    if (interaction.commandName === "stats") {
        const user = interaction.options.getUser("user");

        const warns = warnings.get(user.id)?.length || 0;

        return interaction.reply(
            `📊 Stats for **${user.tag}**:\nWarnings: **${warns}**`
        );
    }
});

client.login(process.env.MTUyMTA1NTEzNzM3NDgwMjA3MA.GgB9ZB.oMT0LGsDK63S0DmTSUDUpkIP7df3qQCRhsBCvg);
