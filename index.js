const javaFile = new java.io.File("./config/ChatTriggers/modules/GuildUtils/guildutils_settings.json");
const apiCallLogFile = new java.io.File("./config/ChatTriggers/modules/GuildUtils/guildutils_apicalls.json");
const KICKQ_QUEUE_LENGTH = 25;
let minLevel = 200;
let apiKey = "";
let defaultrank = "Member";
let trustlevel = 250;
let trusttime = 30;
let kickqLength = 25;
let shiftPunchEnabled = false;
let apiRequestCount = 0;
let apiRequestWarned = false;
let kickqApiRequests = 0;
let kickqApiWarned = false;


loadSettings();



// Tests ====================

// ==========================


// Old Settings ==============
function saveSettings() {
    try {
        const settings = {
            minLevel,
            apiKey,
            defaultrank,
            trustlevel,
            trusttime,
            kickqLength,
            shiftPunchEnabled,
            trustrank,
            reply4guilded
        };
        const writer = new java.io.PrintWriter(javaFile);
        writer.println(JSON.stringify(settings));
        writer.close();
    } catch (e) {
    }
}

function loadSettings() {
    try {
        if (javaFile.exists()) {
            const reader = new java.util.Scanner(javaFile).useDelimiter("\\Z");
            const content = reader.hasNext() ? reader.next() : "";
            reader.close();
            if (content) {
                const settings = JSON.parse(content);
                if (typeof settings.minLevel === "number") minLevel = settings.minLevel;
                if (typeof settings.apiKey === "string") apiKey = settings.apiKey;
                if (typeof settings.defaultrank === "string") defaultrank = settings.defaultrank;
                if (typeof settings.trustlevel === "number") trustlevel = settings.trustlevel;
                if (typeof settings.trusttime === "number") trusttime = settings.trusttime;
                if (typeof settings.kickqLength === "number") kickqLength = settings.kickqLength;
                if (typeof settings.shiftPunchEnabled === "boolean") shiftPunchEnabled = settings.shiftPunchEnabled;
                if (typeof settings.trustrank === "string") trustrank = settings.trustrank;
                if (typeof settings.reply4guilded === "boolean") reply4guilded = settings.reply4guilded;
            }
        }
    } catch (e) {
    }
}
// ==========================



// Functions ================

function showHelp() {
    ChatLib.chat("&b&m----------------------------------------------------------------");
    ChatLib.chat("&3                          GuildUtils Commands:");
    ChatLib.chat("&a/gu lobby &7- Checks the lobby for players and their guild info");
    ChatLib.chat("&a/gu player <name> &7- Checks a specific player's guild info");
    ChatLib.chat("&a/gu shiftpunch &7- Toggle shift-punch player for guild info");
    ChatLib.chat("&a/gu trusted &7- Checks for members who are above trusted level");
    ChatLib.chat("&a/gu reply4guilded &7- Toggles lobby sending messages if person is in a guild");
    ChatLib.chat("&a/kickq <lvl, gexp, ratio> &7- Shows kick queue based on level, weekly gexp, or gexp/level ratio");
    ChatLib.chat("&a/gu api <key> &7- Sets your Hypixel API key");
    ChatLib.chat("&a/gu kickqlength <number> &7- Set how many members to show in /kickq");
    ChatLib.chat("&a/gu apicount &7- Show Hypixel API calls in last 5 minutes");
    ChatLib.chat("&a/gu minlevel <level> &7- Sets the minimum SkyBlock level");
    ChatLib.chat("&a/gu trustlevel <level> &7- Sets the trusted level");
    ChatLib.chat("&a/gu defaultrank <rank> &7- Set this to your guild member rank");
    ChatLib.chat("&a/gu trusttime <time> &7- Time in days someone needs to get trusted");
    ChatLib.chat("&a/gu trustrank <rank> &7- Set this to your guild's trusted rank");
    ChatLib.chat("&a/gu help &7- Shows this help menu");
    ChatLib.chat("&b&m----------------------------------------------------------------");
}

function getLevelColor(level) {
    if (level <= 40) return "&7";       // Gray
    if (level <= 80) return "&f";       // White
    if (level <= 120) return "&e";      // Yellow
    if (level <= 160) return "&a";      // Green
    if (level <= 200) return "&2";      // Dark Green
    if (level <= 240) return "&b";      // Aqua
    if (level <= 280) return "&3";      // Cyan
    if (level <= 320) return "&9";      // Blue
    if (level <= 360) return "&d";      // Pink
    if (level <= 400) return "&5";      // Purple
    if (level <= 440) return "&6";      // Gold
    if (level <= 480) return "&c";      // Red
    return "&4";                        // Dark Red
}

function getTagColorCode(color) {
    switch (color) {
        case "BLACK": return "&0";
        case "DARK_BLUE": return "&1";
        case "DARK_GREEN": return "&2";
        case "DARK_AQUA": return "&3";
        case "DARK_RED": return "&4";
        case "DARK_PURPLE": return "&5";
        case "GOLD": return "&6";
        case "GRAY": return "&7";
        case "DARK_GRAY": return "&8";
        case "BLUE": return "&9";
        case "GREEN": return "&a";
        case "AQUA": return "&b";
        case "RED": return "&c";
        case "LIGHT_PURPLE": return "&d";
        case "YELLOW": return "&e";
        case "WHITE": return "&f";
        default: return "&7"; // fallback gray
    }
}

function runWithDelay(cmd, delay) {
    new Thread(() => {
        Thread.sleep(delay);
        ChatLib.command(cmd);
    }).start();
}

function saveSettings() {
    try {
        const settings = {
            minLevel,
            apiKey,
            defaultrank,
            trustlevel,
            trusttime,
            kickqLength,
            shiftPunchEnabled,
            trustrank,
            reply4guilded
        };
        const writer = new java.io.PrintWriter(javaFile);
        writer.println(JSON.stringify(settings));
        writer.close();
    } catch (e) {
    }
}

function loadSettings() {
    try {
        if (javaFile.exists()) {
            const reader = new java.util.Scanner(javaFile).useDelimiter("\\Z");
            const content = reader.hasNext() ? reader.next() : "";
            reader.close();
            if (content) {
                const settings = JSON.parse(content);
                if (typeof settings.minLevel === "number") minLevel = settings.minLevel;
                if (typeof settings.apiKey === "string") apiKey = settings.apiKey;
                if (typeof settings.defaultrank === "string") defaultrank = settings.defaultrank;
                if (typeof settings.trustlevel === "number") trustlevel = settings.trustlevel;
                if (typeof settings.trusttime === "number") trusttime = settings.trusttime;
                if (typeof settings.kickqLength === "number") kickqLength = settings.kickqLength;
                if (typeof settings.shiftPunchEnabled === "boolean") shiftPunchEnabled = settings.shiftPunchEnabled;
                if (typeof settings.trustrank === "string") trustrank = settings.trustrank;
                if (typeof settings.reply4guilded === "boolean") reply4guilded = settings.reply4guilded;
            }
        }
    } catch (e) {
    }
}

// This and KickQ api warns might not be working (wip)
function warnApiUsage() {
    if (apiRequestCount > 250 && !apiRequestWarned) {
        ChatLib.chat("&c[GuildUtils] Warning: High API usage! Slow down to avoid being ratelimited.");
        apiRequestWarned = true;
    }
}

function fetchLevelsForMembers(members, callback) {
    let done = 0;
    let total = members.length;
    members.forEach(m => {
        new Thread(() => {
            try {
                const uuid = m.uuid;
                const sbUrl = `https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}&key=${apiKey}`;
                logIfHypixelApi(sbUrl);
                const sbJavaUrl = new java.net.URL(sbUrl);
                const sbConn = sbJavaUrl.openConnection();
                sbConn.setRequestMethod("GET");
                sbConn.setConnectTimeout(5000);
                sbConn.setReadTimeout(5000);
                const sbReader = new java.io.BufferedReader(new java.io.InputStreamReader(sbConn.getInputStream()));
                let sbResponse = "";
                let sbLine;
                while ((sbLine = sbReader.readLine()) !== null) sbResponse += sbLine;
                sbReader.close();
                const sbJson = JSON.parse(sbResponse);
                let sbLevel = 0;
                if (sbJson && sbJson.profiles && sbJson.profiles.length > 0) {
                    let profile = sbJson.profiles.find(p => p.selected) || sbJson.profiles[0];
                    if (profile && profile.members && profile.members[uuid.replace(/-/g,"")]) {
                        let memberData = profile.members[uuid.replace(/-/g,"")];
                        if (memberData.leveling && typeof memberData.leveling.experience === "number") {
                            sbLevel = Math.floor(memberData.leveling.experience / 100);
                        }
                    }
                }
                m.sbLevel = sbLevel;
            } catch (e) {
                m.sbLevel = 0;
            }
            done++;
            if (done === total) callback(members);
        }).start();
    });
}

function showKickQueue(members, mode) {
    let shown = 0;
    ChatLib.chat(`&3------------------- &bKick Queue (${mode}) &3-------------------`);
    for (let i = 0; i < members.length && shown < kickqLength; i++) {
        const m = members[i];
        let name = m.uuid;
        try {
            const nameUrl = new java.net.URL(`https://api.ashcon.app/mojang/v2/user/${m.uuid}`);
            apiRequestCount++;
            warnApiUsage();
            const nameConn = nameUrl.openConnection();
            nameConn.setRequestMethod("GET");
            nameConn.setConnectTimeout(5000);
            nameConn.setReadTimeout(5000);
            const nameReader = new java.io.BufferedReader(new java.io.InputStreamReader(nameConn.getInputStream()));
            let nameResponse = "";
            let nameLine;
            while ((nameLine = nameReader.readLine()) !== null) nameResponse += nameLine;
            nameReader.close();
            const nameJson = JSON.parse(nameResponse);
            if (nameJson && nameJson.username) name = nameJson.username;
        } catch (e) {}
        if (mode === "gexp") {
            ChatLib.chat(`&b${name} &7- &e${formatGexp(m.weeklyGexp)} gexp &8| &aLvl ${m.sbLevel}`);
        } else if (mode === "lvl") {
            ChatLib.chat(`&b${name} &7- &aLvl ${m.sbLevel} &8| &e${formatGexp(m.weeklyGexp)} gexp`);
        } else if (mode === "ratio") {
            ChatLib.chat(`&b${name} &7- &dRatio: ${m.ratio.toFixed(2)} &8| &e${formatGexp(m.weeklyGexp)} gexp &aLvl ${m.sbLevel}`);
        }
        shown++;
    }
    ChatLib.chat("&3----------------------------------------------------------");
}


function warnKickqApiUsage() { 
    if (!kickqApiWarned && kickqApiRequests > 250) {
        ChatLib.chat("&c[GuildUtils] Warning: High API usage! You may be rate-limited soon.");
        kickqApiWarned = true;
    }
}

function fetchJsonUrl(url, headers) {
    if (url.indexOf("api.hypixel.net") !== -1) logApiCall();
    kickqApiRequests++;
    warnKickqApiUsage();
    return new Promise((resolve, reject) => {
        new Thread(() => {
            try {
                const javaUrl = new java.net.URL(url);
                const conn = javaUrl.openConnection();
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(5000);
                if (headers) {
                    for (let key in headers) conn.setRequestProperty(key, headers[key]);
                }
                const reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
                let response = "";
                let line;
                while ((line = reader.readLine()) !== null) response += line;
                reader.close();
                resolve(JSON.parse(response));
            } catch (e) {
                reject(e);
            }
        }).start();
    });
}

function getAshconName(uuid) {
    return fetchJsonUrl(`https://api.ashcon.app/mojang/v2/user/${uuid}`).then(json => json.username || uuid).catch(() => uuid);
}

function getAshconUuid(name) {
    return fetchJsonUrl(`https://api.ashcon.app/mojang/v2/user/${name}`).then(json => json.uuid || name).catch(() => name);
}

function getSkyblockLevel(uuid) {
    return fetchJsonUrl(`https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}&key=${apiKey}`).then(sbJson => {
        let sbLevel = 0;
        if (sbJson && sbJson.profiles && sbJson.profiles.length > 0) {
            let profile = sbJson.profiles.find(p => p.selected) || sbJson.profiles[0];
            if (profile && profile.members && profile.members[uuid.replace(/-/g,"")]) {
                let memberData = profile.members[uuid.replace(/-/g,"")];
                if (memberData.leveling && typeof memberData.leveling.experience === "number") {
                    sbLevel = Math.floor(memberData.leveling.experience / 100);
                }
            }
        }
        return sbLevel;
    }).catch(() => 0);
}

function getGuildData() {
    return getAshconUuid(Player.getName()).then(uuid =>
        fetchJsonUrl(`https://api.hypixel.net/v2/guild?key=${apiKey}&player=${uuid}`)
    );
}

function getWeeklyGexp(member) {
    // Sums the last 7 days of expHistory
    if (!member.expHistory) return 0;
    let xpDays = Object.values(member.expHistory);
    let sum = 0;
    for (let i = 0; i < Math.min(7, xpDays.length); i++) sum += xpDays[i];
    return sum;
}

function formatKickqEntry(entry, idx) {
    return `&7${idx+1}. &b${entry.name} &8[&e${entry.level}&8] &7- &a${entry.gexp} gexp &7(ratio: &b${entry.ratio.toFixed(2)}&7)`;
}

function runKickq(subcmd) {
    kickqApiRequests = 0;
    kickqApiWarned = false;
    ChatLib.chat(`&b[KickQ] Fetching guild data...`);
    getGuildData().then(guildJson => {
        if (!guildJson || !guildJson.guild || !guildJson.guild.members) {
            ChatLib.chat("&c[KickQ] Could not fetch guild members. Check your API key.");
            return;
        }
        const members = guildJson.guild.members;
        // Fetch all SkyBlock levels in parallel
        Promise.all(members.map(member =>
            getSkyblockLevel(member.uuid).then(level => ({ uuid: member.uuid, expHistory: member.expHistory, level }))
        )).then(levelsArr => {
            let entries = levelsArr.map((obj, i) => {
                let gexp = getWeeklyGexp(members[i]);
                let level = obj.level;
                let ratio = level > 0 ? gexp / level : 0;
                return { uuid: obj.uuid, gexp, level, ratio };
            });
            // Sort by subcmd
            if (subcmd === "lvl") {
                entries.sort((a, b) => a.level - b.level || a.gexp - b.gexp);
            } else if (subcmd === "gexp") {
                entries.sort((a, b) => a.gexp - b.gexp || a.level - b.level);
            } else if (subcmd === "ratio") {
                entries.sort((a, b) => a.ratio - b.ratio || a.level - b.level);
            } else {
                ChatLib.chat("&c[KickQ] Usage: /kickq <lvl|gexp|ratio>");
                return;
            }
            let lowest = entries.slice(0, KICKQ_QUEUE_LENGTH);

            Promise.all(lowest.map(entry => getAshconName(entry.uuid))).then(names => {
                for (let i = 0; i < lowest.length; i++) lowest[i].name = names[i];
                ChatLib.chat(`&3&b------------------- &bKick Queue (${subcmd}) &3-------------------`);
                lowest.forEach((entry, idx) => ChatLib.chat(formatKickqEntry(entry, idx)));
                ChatLib.chat("&3&b------------------------------------------------------");
                if (kickqApiRequests > 20) ChatLib.chat(`&e[KickQ] Used ${kickqApiRequests} API requests for this query.`);
            });
        });
    }).catch(() => {
        ChatLib.chat("&c[KickQ] Error fetching guild data or API key invalid.");
    });
}

function logApiCall() {
    let now = Date.now();
    let calls = [];
    try {
        if (apiCallLogFile.exists()) {
            const reader = new java.util.Scanner(apiCallLogFile).useDelimiter("\\Z");
            const content = reader.hasNext() ? reader.next() : "";
            reader.close();
            if (content) {
                try {
                    calls = JSON.parse(content);
                    if (!Array.isArray(calls)) calls = [];
                } catch (e) { calls = []; }
            }
        }
    } catch (e) { calls = []; }
    calls.push(now);
    // Remove calls older than 5 minutes
    const cutoff = now - 5 * 60 * 1000;
    calls = calls.filter(ts => typeof ts === "number" && ts >= cutoff);
    try {
        const writer = new java.io.PrintWriter(apiCallLogFile);
        writer.println(JSON.stringify(calls));
        writer.close();
    } catch (e) {}
}

function getRecentApiCallCount() {
    let now = Date.now();
    let calls = [];
    try {
        if (apiCallLogFile.exists()) {
            const reader = new java.util.Scanner(apiCallLogFile).useDelimiter("\\Z");
            const content = reader.hasNext() ? reader.next() : "";
            reader.close();
            if (content) calls = JSON.parse(content);
        }
    } catch (e) { calls = []; }
    const cutoff = now - 5 * 60 * 1000;
    calls = calls.filter(ts => ts >= cutoff);
    return calls.length;
}

function logIfHypixelApi(url) {
    if (typeof url === "string" && url.indexOf("api.hypixel.net") !== -1) logApiCall();
}

function formatGexp(gexp) {
    let str = String(Math.floor(Math.abs(Number(gexp))));
    let out = '';
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        out = str[i] + out;
        count++;
        if (count % 3 === 0 && i !== 0) out = ',' + out;
    }
    return out;
}

// ==========================


// KickQ Commands ===========
register("command", (...args) => {
    if (!apiKey || apiKey.length < 32) {
        ChatLib.chat("&c[GuildUtils] Please set your Hypixel API key with /gu api <key> first.");
        return;
    }
    if (args.length === 0 || !["lvl","gexp","ratio"].includes(args[0].toLowerCase())) {
        ChatLib.chat("&b/kickq lvl &7- Show lowest SkyBlock level members");
        ChatLib.chat("&b/kickq gexp &7- Show lowest weekly gexp members");
        ChatLib.chat("&b/kickq ratio &7- Show lowest gexp/level ratio members");
        return;
    }display.setLine(0, `${apiRequestCount}+${kickqApiRequests}`);
    const sub = args[0].toLowerCase();
    ChatLib.chat(`&a[GuildUtils] Fetching guild data for /kickq ${sub}...`);
    ChatLib.chat(`&7(This may take some time)`);
    new Thread(() => {
        try {
            
            const uuidUrl = new java.net.URL(`https://api.ashcon.app/mojang/v2/user/${Player.getName()}`);
            apiRequestCount++;
            warnApiUsage();
            const uuidConn = uuidUrl.openConnection();
            uuidConn.setRequestMethod("GET");
            uuidConn.setConnectTimeout(5000);
            uuidConn.setReadTimeout(5000);
            const uuidReader = new java.io.BufferedReader(new java.io.InputStreamReader(uuidConn.getInputStream()));
            let uuidResponse = "";
            let uuidLine;
            while ((uuidLine = uuidReader.readLine()) !== null) uuidResponse += uuidLine;
            uuidReader.close();
            const uuidJson = JSON.parse(uuidResponse);
            if (!uuidJson || !uuidJson.uuid) {
                ChatLib.chat("&c[GuildUtils] Could not fetch your UUID. Make sure you are not nicked.");
                return;
            }
            
            const guildUrl = new java.net.URL(`https://api.hypixel.net/v2/guild?key=${apiKey}&player=${uuidJson.uuid}`);
            apiRequestCount++;
            warnApiUsage();
            const guildConn = guildUrl.openConnection();
            guildConn.setRequestMethod("GET");
            guildConn.setConnectTimeout(5000);
            guildConn.setReadTimeout(5000);
            const guildReader = new java.io.BufferedReader(new java.io.InputStreamReader(guildConn.getInputStream()));
            let guildResponse = "";
            let guildLine;
            while ((guildLine = guildReader.readLine()) !== null) guildResponse += guildLine;
            guildReader.close();
            const guildJson = JSON.parse(guildResponse);
            if (!guildJson || !guildJson.guild || !guildJson.guild.members) {
                ChatLib.chat("&c[GuildUtils] Could not fetch your guild info. Check your API key and guild status.");
                return;
            }
            const members = guildJson.guild.members;
            // Precompute weekly gexp for all
            members.forEach(m => {
                m.weeklyGexp = 0;
                if (m.expHistory) {
                    let xpDays = Object.values(m.expHistory);
                    for (let i = 0; i < Math.min(7, xpDays.length); i++) m.weeklyGexp += xpDays[i];
                }
            });
            // Sort by subcommand
            if (sub === "gexp") {
                fetchLevelsForMembers(members, (membersWithLevels) => {
                    membersWithLevels.sort((a, b) => {
                        if (a.weeklyGexp !== b.weeklyGexp) return a.weeklyGexp - b.weeklyGexp;
                        return a.sbLevel - b.sbLevel;
                    });
                    showKickQueue(membersWithLevels, "gexp");
                });
            } else if (sub === "lvl") {
                fetchLevelsForMembers(members, (membersWithLevels) => {
                    membersWithLevels.sort((a, b) => {
                        if (a.sbLevel !== b.sbLevel) return a.sbLevel - b.sbLevel;
                        return a.weeklyGexp - b.weeklyGexp;
                    });
                    showKickQueue(membersWithLevels, "lvl");
                });
            } else if (sub === "ratio") {
                fetchLevelsForMembers(members, (membersWithLevels) => {
                    membersWithLevels.forEach(m => {
                        m.ratio = m.sbLevel > 0 ? m.weeklyGexp / m.sbLevel : 0;
                    });
                    membersWithLevels.sort((a, b) => {
                        if (a.ratio !== b.ratio) return a.ratio - b.ratio;
                        return a.sbLevel - b.sbLevel;
                    });
                    showKickQueue(membersWithLevels, "ratio");
                });
            }
        } catch (e) {
            ChatLib.chat("&c[GuildUtils] Error fetching data for /kickq. Check your API key and try again.");
        }
    }).start();
}).setName("kickq");

register("command", (...args) => {
    if (args.length === 0 || !["lvl","gexp","ratio"].includes(args[0].toLowerCase())) {
        ChatLib.chat("&c[KickQ] Usage: /kickq <lvl|gexp|ratio>");
        return;
    }
    runKickq(args[0].toLowerCase());
}).setName("kickq");
// ==========================


// GuildUtils Commands ======
register("command", (...args) => {
    if (args.length === 1 && args[0].toLowerCase() === "shiftpunch") {
        shiftPunchEnabled = !shiftPunchEnabled;
        saveSettings();
        ChatLib.chat(`&c[GuildUtils] Shift-punch guild info is now ${shiftPunchEnabled ? "&aON" : "&cOFF"}`);
        return;
    }
    const sub = args[0].toLowerCase();
    if (sub === "help") {
        showHelp();
        return;
    }
    if (sub === "api" && args[1]) {
        apiKey = args[1];
        saveSettings();
        ChatLib.chat(`&c[GuildUtils] &aAPI key set to: &e${apiKey}`);
        return;
    }
    if (sub === "reply4guilded" && args.length === 1 && args[0].toLowerCase() === "reply4guilded") {
    reply4guilded = !reply4guilded;
    saveSettings();
    ChatLib.chat(`&c[GuildUtils] &aSending messages for lobby members in guilds it now ${reply4guilded ? "&aON" : "&cOFF"}`);
    return;
}
    if (sub === "minlevel" && args[1]) {
        minLevel = parseInt(args[1]) || 0;
        saveSettings();
        ChatLib.chat(`&c[GuildUtils] &aMinimum SkyBlock level set to: &e${minLevel}`);
        return;
    }
    if (sub === "defaultrank" && args[1]) {
        defaultrank = args.slice(1).join(" ");
        saveSettings();
        ChatLib.chat(`&c[GuildUtils] &aDefault rank set to: &e${defaultrank}`);
        return;
    }
    if (sub === "trustlevel" && args[1]) {
        trustlevel = parseInt(args[1]) || 0;
        saveSettings();
        ChatLib.chat(`&c[GuildUtils] &aTrusted level set to: &e${trustlevel}`);
        return;
    }
    if (sub === "trusttime" && args[1]) {
        trusttime = parseInt(args[1]) || 0;
        saveSettings();
        ChatLib.chat(`&c[GuildUtils] &aTrust time set to: &e${trusttime} days`);
        return;
    }
    if (sub === "trustrank" && args[1]) {
        trustrank = args.slice(1).join(" ");
        saveSettings();
        ChatLib.chat(`&c[GuildUtils] &aTrust rank set to: &e${trustrank}`);
        return;
    }
    if (sub === "kickqlength" && args[1]) {
        let n = parseInt(args[1]);
        if (isNaN(n) || n < 1 || n > 125) {
            ChatLib.chat("&c[GuildUtils] Please enter a number between 1 and 125.");
            return;
        }
        kickqLength = n;
        saveSettings();
        ChatLib.chat(`&a[GuildUtils] Kick queue length set to: &e${kickqLength}`);
        return;
    }
    if (sub === "apicount") {
        const count = getRecentApiCallCount();
        ChatLib.chat(`&a[GuildUtils] Hypixel API calls in last 5 minutes: &e${count}`);
        return;
    }
    if (sub === "lobby") {
    const selfName = Player.getName();
    const players = World.getAllPlayers()
        .filter(p =>
            typeof p.getUUID === "function" &&
            p.getUUID() &&
            p.getUUID() !== "00000000-0000-0000-0000-000000000000" &&
            p.getName() !== selfName // skip yourself
        )
        .map(p => p.getName());

    if (players.length === 0) {
        ChatLib.chat("&cNo players found.");
        return;
    }

    ChatLib.chat("&c[GuildUtils] &aFetching guild info for players in your lobby above SkyBlock level " + minLevel + "...");

    players.forEach(name => {
        new Thread(() => {
            try {
                const url = `https://api.ashcon.app/mojang/v2/user/${name}`;
                const conn = new java.net.URL(url).openConnection();
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(5000);

                const reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
                let response = "", line;
                while ((line = reader.readLine()) !== null) response += line;
                reader.close();

                const json = JSON.parse(response);
                if (!json || !json.uuid || !json.username) return;

                const sbUrl = `https://api.hypixel.net/v2/skyblock/profiles?uuid=${json.uuid}&key=${apiKey}`;
                const sbConn = new java.net.URL(sbUrl).openConnection();
                sbConn.setRequestMethod("GET");
                sbConn.setConnectTimeout(5000);
                sbConn.setReadTimeout(5000);

                const sbReader = new java.io.BufferedReader(new java.io.InputStreamReader(sbConn.getInputStream()));
                let sbResponse = "", sbLine;
                while ((sbLine = sbReader.readLine()) !== null) sbResponse += sbLine;
                sbReader.close();

                const sbJson = JSON.parse(sbResponse);
                let sbLevel = 0;
                if (sbJson && sbJson.profiles && sbJson.profiles.length > 0) {
                    const profile = sbJson.profiles.find(p => p.selected) || sbJson.profiles[0];
                    const m = profile && profile.members && profile.members[json.uuid.replace(/-/g, "")];
                    if (m && m.leveling && typeof m.leveling.experience === "number") {
                        sbLevel = Math.floor(m.leveling.experience / 100);
                    }
                }

                if (sbLevel < minLevel) return;

                const uuidNoDash = json.uuid.replace(/-/g, "");
                const guildUrl = `https://api.hypixel.net/v2/guild?player=${uuidNoDash}&key=${apiKey}`;
                const guildConn = new java.net.URL(guildUrl).openConnection();
                guildConn.setRequestMethod("GET");
                guildConn.setConnectTimeout(5000);
                guildConn.setReadTimeout(5000);

                const guildReader = new java.io.BufferedReader(new java.io.InputStreamReader(guildConn.getInputStream()));
                let guildResponse = "", gl;
                while ((gl = guildReader.readLine()) !== null) guildResponse += gl;
                guildReader.close();

                const guildJson = JSON.parse(guildResponse);

                if (guildJson && guildJson.success && guildJson.guild && Array.isArray(guildJson.guild.members)) {
                    const member = guildJson.guild.members.find(m => m.uuid === uuidNoDash);
                    if (member) {
                        const guildName = guildJson.guild.name;
                        const rank = member.rank;
                        const guildTag = guildJson.guild.tag || "";
                        const tagColor = getTagColorCode(guildJson.guild.tagColor || "");
                        const joinedMs = member.joined;
                        const days = Math.floor((java.lang.System.currentTimeMillis() - joinedMs) / (1000 * 60 * 60 * 24));
                        const timeStr = days > 0 ? `${days} days` : "<1 day";
                        let weeklyXP = 0;
                        if (member.expHistory) {
                            const vals = Object.values(member.expHistory);
                            for (let i = 0; i < Math.min(7, vals.length); i++) weeklyXP += vals[i];
                        }
                        const memberCount = guildJson.guild.members.length;

                        if (reply4guilded) {
                            ChatLib.chat(" ");
                            const levelColor = getLevelColor(sbLevel);
                            const hoverText = `&8[${levelColor}${sbLevel}&8] &b${name} ${tagColor}[${guildTag}]
&aGuild: ${tagColor}${guildName}
&aRank: &b${rank}
&aDays in guild: &b${timeStr}
&aWeekly GEXP: &b${formatGexp(weeklyXP)}
&aGuild Size: &b${memberCount}/125
&5(Click to Party)`

                            const msg = new TextComponent(`&8[${levelColor}${sbLevel}&8] &b${name} ${tagColor}[${guildTag}]`)
                        .setClick("run_command", `/p ${name}`)
                        .setHover("show_text", `${hoverText}`);
                    ChatLib.chat(msg);
                            
                        }
                        return;
                    }
                }
                ChatLib.chat(" ");
                const levelColor = getLevelColor(sbLevel);
                const msg = new TextComponent(`&8[${levelColor}${sbLevel}&8] &b${name}&5 is not in a guild.`)
                    .setClick("run_command", `/p ${name}`)
                    .setHover("show_text", `&aClick to party &8[${levelColor}${sbLevel}&8] &b${name}`);
                ChatLib.chat(msg);

            } catch (e) {
            }
        }).start();
    });

    return;
}
    if (sub === "player" && args[1]) {
        const name = args[1];
        ChatLib.chat(`&aFetching guild info for &b${name}&a...`);
        new Thread(() => {
            try {
                const url = new java.net.URL(`https://api.ashcon.app/mojang/v2/user/${name}`);
                const conn = url.openConnection();
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(5000);
                const reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
                let response = "";
                let line;
                while ((line = reader.readLine()) !== null) {
                    response += line;
                }
                reader.close();
                const json = JSON.parse(response);
                if (json && json.uuid && json.username && json.username.length > 0) {
                    try {
                        const sbUrl = `https://api.hypixel.net/v2/skyblock/profiles?uuid=${json.uuid}&key=${apiKey}`;
                        logIfHypixelApi(sbUrl);
                        const sbJavaUrl = new java.net.URL(sbUrl);
                        const sbConn = sbJavaUrl.openConnection();
                        sbConn.setRequestMethod("GET");
                        sbConn.setConnectTimeout(5000);
                        sbConn.setReadTimeout(5000);
                        const sbReader = new java.io.BufferedReader(new java.io.InputStreamReader(sbConn.getInputStream()));
                        let sbResponse = "";
                        let sbLine;
                        while ((sbLine = sbReader.readLine()) !== null) {
                            sbResponse += sbLine;
                        }
                        sbReader.close();
                        const sbJson = JSON.parse(sbResponse);
                        let sbLevel = 0;
                        if (sbJson && sbJson.profiles && sbJson.profiles.length > 0) {
                            let profile = sbJson.profiles.find(p => p.selected) || sbJson.profiles[0];
                            if (profile && profile.members && profile.members[json.uuid.replace(/-/g,"")]) {
                                let memberData = profile.members[json.uuid.replace(/-/g,"")];
                                if (memberData.leveling && typeof memberData.leveling.experience === "number") {
                                    sbLevel = Math.floor(memberData.leveling.experience / 100);
                                }
                            }
                        }
                        try {
                            const guildUrl = `https://api.hypixel.net/v2/guild?player=${json.uuid}`;
                            logIfHypixelApi(guildUrl);
                            const guildJavaUrl = new java.net.URL(guildUrl);
                            const guildConn = guildJavaUrl.openConnection();
                            guildConn.setRequestMethod("GET");
                            guildConn.setRequestProperty("API-Key", apiKey);
                            guildConn.setConnectTimeout(5000);
                            guildConn.setReadTimeout(5000);
                            const guildReader = new java.io.BufferedReader(new java.io.InputStreamReader(guildConn.getInputStream()));
                            let guildResponse = "";
                            let guildLine;
                            while ((guildLine = guildReader.readLine()) !== null) {
                                guildResponse += guildLine;
                            }
                            guildReader.close();
                            const guildJson = JSON.parse(guildResponse);
                            if (guildJson && guildJson.guild && guildJson.guild.members) {
                                const member = guildJson.guild.members.find(m => m.uuid.replace(/-/g,"") === json.uuid.replace(/-/g,"") );
                                if (member) {
                                    const guildName = guildJson.guild.name;
                                    const rank = member.rank;
                                    const guildTag = guildJson.guild.tag || "";
                                    const tagColor = getTagColorCode(guildJson.guild.tagColor || "");
                                    const joined = member.joined;
                                    const now = java.lang.System.currentTimeMillis();
                                    const joinedMs = joined;
                                    const diff = now - joinedMs;
                                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                                    let timeStr = days > 0 ? `${days} days` : "<1 day";
                                    let weeklyXP = 0;
                                    if (member.expHistory) {
                                        let xpDays = Object.values(member.expHistory);
                                        for (let i = 0; i < Math.min(7, xpDays.length); i++) {
                                            weeklyXP += xpDays[i];
                                        }
                                    }
                                    const memberCount = guildJson.guild.members.length;
                                    const levelColor = getLevelColor(sbLevel);
                                    ChatLib.chat(" ");
                                    const hoverText = `&8[${levelColor}${sbLevel}&8] &b${name} ${tagColor}[${guildTag}]
&aGuild: ${tagColor}${guildName}
&aRank: &b${rank}
&aDays in guild: &b${timeStr}
&aWeekly GEXP: &b${formatGexp(weeklyXP)}
&aGuild Size: &b${memberCount}/125
&5(Click to Party)`

                            const msg = new TextComponent(`&8[${levelColor}${sbLevel}&8] &b${name} ${tagColor}[${guildTag}]&a is in ${tagColor}${guildName}&a as &b${rank} &7|| &a Days: &b${timeStr} &7| &aGEXP: &b${formatGexp(weeklyXP)} &7|&a Size: &b${memberCount}/125`)
                        .setClick("run_command", `/p ${name}`)
                        .setHover("show_text", `${hoverText}`);
                    ChatLib.chat(msg);

                                } else {
                                    const levelColor = getLevelColor(sbLevel);
                                    ChatLib.chat(`&8[${levelColor}${sbLevel}&8] &b${name}&5 is not in a guild.`);

                                }
                            } else {
                                    const levelColor = getLevelColor(sbLevel);
                                    ChatLib.chat(`&8[${levelColor}${sbLevel}&8] &b${name}&5 is not in a guild.`);
                            }
                        } catch (e) {
                        }
                    } catch (e) {
                    }
                }
            } catch (e) {
            }
        }).start();
        return;
    }
if (sub === "trusted") {
    const playerName = Player.getName();
    ChatLib.chat("&aChecking guild members for trusted status...");
    new Thread(() => {
        try {
            const uuidUrl = new java.net.URL(`https://api.ashcon.app/mojang/v2/user/${playerName}`);
            const uuidConn = uuidUrl.openConnection();
            uuidConn.setRequestMethod("GET");
            uuidConn.setConnectTimeout(5000);
            uuidConn.setReadTimeout(5000);
            const uuidReader = new java.io.BufferedReader(new java.io.InputStreamReader(uuidConn.getInputStream()));
            let uuidResponse = "";
            let uuidLine;
            while ((uuidLine = uuidReader.readLine()) !== null) uuidResponse += uuidLine;
            uuidReader.close();

            let uuidJson;
            try {
                uuidJson = JSON.parse(uuidResponse);
            } catch (e) {
                ChatLib.chat("&cCould not parse your UUID from Ashcon.");
                return;
            }
            if (!uuidJson || !uuidJson.uuid) {
                ChatLib.chat("&cCould not fetch your UUID. Make sure you are not nicked.");
                return;
            }

            const playerUUID = uuidJson.uuid;
            const guildUrl = `https://api.hypixel.net/v2/guild?key=${apiKey}&player=${playerUUID}`;
            logIfHypixelApi(guildUrl);
            const guildConn = new java.net.URL(guildUrl).openConnection();
            guildConn.setRequestMethod("GET");
            guildConn.setConnectTimeout(5000);
            guildConn.setReadTimeout(5000);
            const guildReader = new java.io.BufferedReader(new java.io.InputStreamReader(guildConn.getInputStream()));
            let guildResponse = "";
            let guildLine;
            while ((guildLine = guildReader.readLine()) !== null) guildResponse += guildLine;
            guildReader.close();

            let guildJson;
            try {
                guildJson = JSON.parse(guildResponse);
            } catch (e) {
                ChatLib.chat("&cCould not parse guild info from Hypixel.");
                return;
            }

            if (!guildJson || !guildJson.guild || !guildJson.guild.members) {
                ChatLib.chat("&cCould not fetch guild members. Check API key and guild.");
                return;
            }

            const now = java.lang.System.currentTimeMillis();
            const members = guildJson.guild.members;

            members.forEach(member => {
                // Only check default + trust ranks
                if (member.rank !== defaultrank && member.rank !== trustrank) return;

                new Thread(() => {
                    try {
                        const uuid = member.uuid;

                        let name = uuid;
                        try {
                            const nameUrl = new java.net.URL(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
                            const nameConn = nameUrl.openConnection();
                            nameConn.setRequestMethod("GET");
                            nameConn.setConnectTimeout(5000);
                            nameConn.setReadTimeout(5000);
                            const nameReader = new java.io.BufferedReader(new java.io.InputStreamReader(nameConn.getInputStream()));
                            let nameResponse = "";
                            let nameLine;
                            while ((nameLine = nameReader.readLine()) !== null) nameResponse += nameLine;
                            nameReader.close();
                            const nameJson = JSON.parse(nameResponse);
                            if (nameJson && nameJson.username) name = nameJson.username;
                        } catch (e) { /* ignore name lookup errors */ }

                        // SkyBlock profile fetch for highest level
                        const sbUrl = `https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}&key=${apiKey}`;
                        logIfHypixelApi(sbUrl);
                        const sbConn = new java.net.URL(sbUrl).openConnection();
                        sbConn.setRequestMethod("GET");
                        sbConn.setConnectTimeout(5000);
                        sbConn.setReadTimeout(5000);
                        const sbReader = new java.io.BufferedReader(new java.io.InputStreamReader(sbConn.getInputStream()));
                        let sbResponse = "";
                        let sbLine;
                        while ((sbLine = sbReader.readLine()) !== null) sbResponse += sbLine;
                        sbReader.close();
                        const sbJson = JSON.parse(sbResponse);

                        let sbLevel = 0;
                        if (sbJson && sbJson.profiles && sbJson.profiles.length > 0) {
                            sbJson.profiles.forEach(profile => {
                                if (profile && profile.members && profile.members[uuid.replace(/-/g,"")]) {
                                    let memberData = profile.members[uuid.replace(/-/g,"")];
                                    if (memberData.leveling && typeof memberData.leveling.experience === "number") {
                                        const level = Math.floor(memberData.leveling.experience / 100);
                                        if (level > sbLevel) sbLevel = level; // take highest
                                    }
                                }
                            });
                        }

                        let daysInGuild = 0;
                        if (member.joined) {
                            daysInGuild = Math.floor((now - member.joined) / (1000 * 60 * 60 * 24));
                        }

                        // Requirements
                        const meetsTrust = (daysInGuild >= trusttime) && (sbLevel >= trustlevel);
                        const belowTrust = (daysInGuild < trusttime) || (sbLevel < trustlevel);

                        // Promotion: default -> trust (must meet BOTH)
                        if (member.rank === defaultrank && meetsTrust) {
                            ChatLib.chat(`&c[GuildUtils] &a&lPROMOTING &b${name} &7| &bLevel: ${sbLevel} &7| &bTime: ${daysInGuild}`);
                            runWithDelay(`g setrank ${name} ${trustrank}`, 1500);
                        }

                        // Demotion: trust -> default (if either is below)
                        if (member.rank === trustrank && belowTrust) {
                            ChatLib.chat(`&c[GuildUtils] &4&lDEMOTING &b${name} &7| &bLevel: ${sbLevel} &7| &bTime: ${daysInGuild}`);
                            runWithDelay(`g setrank ${name} ${defaultrank}`, 1500);
                        }

                    } catch (e) {
                        ChatLib.chat("&cError checking member: " + e);
                    }
                }).start();
            });

        } catch (e) {
            ChatLib.chat("&cError fetching guild info. Check your API key.");
        }
    }).start();
    return;
}

    // If no subcommand matched, show help
    showHelp();
}).setName("gu").setAliases(["guildutils"]);
// ==========================


// Shift Punch===============
register("attackEntity", (entity) => {
    if (!shiftPunchEnabled) return;
    if (!Player.isSneaking()) return;
    if (!entity || typeof entity.getName !== "function") return;
    if (entity.getClassName && entity.getClassName() !== "EntityOtherPlayerMP") return;
    const name = entity.getName();
    if (!name || name.length < 3 || name.length > 16) return;
    // Check if the name has a valid UUID before proceeding
    new Thread(() => {
        try {
            const url = new java.net.URL(`https://api.ashcon.app/mojang/v2/user/${name}`);
            const conn = url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            const reader = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
            let response = "";
            let line;
            while ((line = reader.readLine()) !== null) {
                response += line;
            }
            reader.close();
            const json = JSON.parse(response);
            if (json && json.uuid && json.username && json.username.length > 0) {
                try {
                    const sbUrl = `https://api.hypixel.net/v2/skyblock/profiles?uuid=${json.uuid}&key=${apiKey}`;
                    logIfHypixelApi(sbUrl);
                    const sbJavaUrl = new java.net.URL(sbUrl);
                    const sbConn = sbJavaUrl.openConnection();
                    sbConn.setRequestMethod("GET");
                    sbConn.setConnectTimeout(5000);
                    sbConn.setReadTimeout(5000);
                    const sbReader = new java.io.BufferedReader(new java.io.InputStreamReader(sbConn.getInputStream()));
                    let sbResponse = "";
                    let sbLine;
                    while ((sbLine = sbReader.readLine()) !== null) {
                        sbResponse += sbLine;
                    }
                    sbReader.close();
                    const sbJson = JSON.parse(sbResponse);
                    let sbLevel = 0;
                    if (sbJson && sbJson.profiles && sbJson.profiles.length > 0) {
                        let profile = sbJson.profiles.find(p => p.selected) || sbJson.profiles[0];
                        if (profile && profile.members && profile.members[json.uuid.replace(/-/g,"")]) {
                            let memberData = profile.members[json.uuid.replace(/-/g,"")];
                            if (memberData.leveling && typeof memberData.leveling.experience === "number") {
                                sbLevel = Math.floor(memberData.leveling.experience / 100);
                            }
                        }
                    }
                    try {
                        const guildUrl = `https://api.hypixel.net/v2/guild?player=${json.uuid}`;
                        logIfHypixelApi(guildUrl);
                        const guildJavaUrl = new java.net.URL(guildUrl);
                        const guildConn = guildJavaUrl.openConnection();
                        guildConn.setRequestMethod("GET");
                        guildConn.setRequestProperty("API-Key", apiKey);
                        guildConn.setConnectTimeout(5000);
                        guildConn.setReadTimeout(5000);
                        const guildReader = new java.io.BufferedReader(new java.io.InputStreamReader(guildConn.getInputStream()));
                        let guildResponse = "";
                        let guildLine;
                        while ((guildLine = guildReader.readLine()) !== null) {
                            guildResponse += guildLine;
                        }
                        guildReader.close();
                        const guildJson = JSON.parse(guildResponse);
                        if (guildJson && guildJson.guild && guildJson.guild.members) {
                            const member = guildJson.guild.members.find(m => m.uuid.replace(/-/g,"") === json.uuid.replace(/-/g,"") );
                            if (member) {
                                const guildName = guildJson.guild.name;
                                const rank = member.rank;
                                const joined = member.joined;
                                const now = java.lang.System.currentTimeMillis();
                                const joinedMs = joined;
                                const diff = now - joinedMs;
                                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                                let timeStr = days > 0 ? `${days} days` : "<1 day";
                                let weeklyXP = 0;
                                if (member.expHistory) {
                                    let xpDays = Object.values(member.expHistory);
                                    for (let i = 0; i < Math.min(7, xpDays.length); i++) {
                                        weeklyXP += xpDays[i];
                                    }
                                }
                                const memberCount = guildJson.guild.members.length;
                                ChatLib.chat(" ");
                                const levelColor = getLevelColor(sbLevel);
                                ChatLib.chat(`&8[${levelColor}${sbLevel}&8] &b${name}&a is in &b${guildName}&a as &b${rank}&a for the last &b${timeStr}&a, XP this week: &b${formatGexp(weeklyXP)}&a, Guild size: &b${memberCount}/125`);
                            } else {
                                ChatLib.chat(" ");
                                const levelColor = getLevelColor(sbLevel);
                                ChatLib.chat(`&8[${levelColor}${sbLevel}&8] &b${name}&5 is not in a guild.`);
                            }
                        } else {
                            ChatLib.chat(" ");
                                const levelColor = getLevelColor(sbLevel);
                                ChatLib.chat(`&8[${levelColor}${sbLevel}&8] &b${name}&5 is not in a guild.`);
                        }
                    } catch (e) {
                        ChatLib.chat(" ");
                                const levelColor = getLevelColor(sbLevel);
                                ChatLib.chat(`&8[${levelColor}${sbLevel}&8] &b${name}&5 is not in a guild.`);
                    }
                } catch (e) {
                }
            }
        } catch (e) {
        }
    }).start();
});
// ==========================