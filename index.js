const { Client, GatewayIntentBits, PermissionFlagsBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

const shifts = new Map();
const warnings = new Map();

client.once("ready", () => {
    console.log(`${client.user.tag} is online.`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // SHIFT SYSTEM
    if (interaction.commandName === "shift") {
        const action = interaction.options.getString("action");

        if (action === "start") {
            shifts.set(interaction.user.id, Date.now());
            return interaction.reply({ content: "Shift started.", ephemeral: true });
        }

        if (action === "end") {
            const start = shifts.get(interaction.user.id);

            if (!start)
                return interaction.reply({ content: "Not on shift.", ephemeral: true });

            const mins = Math.floor((Date.now() - start) / 60000);
            shifts.delete(interaction.user.id);

            return interaction.reply(`Shift ended. Time: ${mins} minutes`);
        }
    }

    // WARN
    if (interaction.commandName === "warn") {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({ content: "No permission.", ephemeral: true });

        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        if (!warnings.has(user.id)) warnings.set(user.id, []);
        warnings.get(user.id).push(reason);

        return interaction.reply(`${user.tag} warned: ${reason}`);
    }

    // PROMOTE
    if (interaction.commandName === "promote") {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator))
            return interaction.reply({ content: "No permission.", ephemeral: true });

        const user = interaction.options.getUser("user");
        const rank = interaction.options.getString("rank");

        return interaction.reply(`${user.tag} promoted to ${rank}`);
    }

    // STATS
    if (interaction.commandName === "stats") {
        const user = interaction.options.getUser("user");
        const warns = warnings.get(user.id)?.length || 0;

        return interaction.reply(`Stats for ${user.tag}: ${warns} warnings`);
    }
});

client.login(process.env.MTUyMTA1NTEzNzM3NDgwMjA3MA.GgB9ZB.oMT0LGsDK63S0DmTSUDUpkIP7df3qQCRhsBCvg);