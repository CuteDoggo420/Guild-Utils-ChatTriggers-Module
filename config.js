import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"


const defaultConf = new DefaultConfig("GuildUtils", "data/settings.json")
    .addSwitch({
        configName: "SreplyIfGuilded",
        title: "Reply if in a guild",
        description: "Wether to give details on players if there in a guild",
        category: "Lobby",
        value: true
    })
    .addTextInput({
        configName: "SminLevel",
        title: "Minimum Level",
        description: "Lowest level players to get guild details on",
        category: "Lobby",
        value: "",
        placeHolder: ""
    })
    .addSwitch({
        configName: "SlobbyClick2P",
        title: "Click to Party",
        description: "Lets you click on the guild reply message to send a party invite to that player",
        category: "Lobby",
        value: true
    })
    .addSwitch({
        configName: "SlobbyAutoInv",
        title: "Auto Invite",
        description: "Automatically invites players who are not in a guild that meet guild reqs",
        category: "Lobby",
        value: false
    })
    .addTextInput({
        configName: "StrustedLevel",
        title: "Trusted Level",
        description: "What level players need to be to get trusted rank",
        category: "Trusted",
        value: "",
        placeHolder: ""
    })
    .addTextInput({
        configName: "StrustedTime",
        title: "Trusted Time",
        description: "Time in days a player needs to be in guild for trusted rank",
        category: "Trusted",
        value: "",
        placeHolder: ""
    })
    .addTextInput({
        configName: "StrustedRank",
        title: "Trusted Rank",
        description: "What rank to give trusted players",
        category: "Trusted",
        value: "Trusted",
        placeHolder: ""
    })
    .addTextInput({
        configName: "SdefaultRank",
        title: "Default Rank",
        description: "What rank your guilds default rank is called",
        category: "Trusted",
        value: "Member",
        placeHolder: ""
    })
    .addSwitch({
        configName: "SautoPromote",
        title: "Auto Promote",
        description: "Automatically promotes trusted players to the trusted rank and demotes them if they no longer meet the requirements",
        category: "Trusted",
        value: false
    })
    .addSwitch({
        configName: "Sclick2Kick",
        title: "Click to Kick",
        description: "Lets you click on the message to kick that player",
        category: "Kick Queue",
        value: true
    })
    .addTextInput({
        configName: "SkickQueueLength",
        title: "Kick Queue Length",
        description: "How many members to show in the kick queue",
        category: "Kick Queue",
        value: "",
        placeHolder: ""
    })
    .addSwitch({
        configName: "SshiftPunch",
        title: "Shift Punch",
        description: "Replys with guild info when shift+punching a player",
        category: "Shift Punch",
        value: false
    })
    .addSwitch({
        configName: "SshiftPunchClick2P",
        title: "Reply Guilded",
        description: "Show guild reply messages only if true",
        category: "Shift Punch",
        value: true
    })
    .addTextInput({
        configName: "SapiKey",
        title: "API",
        description: "Your Hypixel API Key, create one from https://developer.hypixel.net/dashboard/apps",
        category: "Api Key",
        value: "",
        placeHolder: ""
    })


const currentScheme = "data/ColorScheme.json"
const scheme = JSON.parse(FileLib.read("GuildUtils", currentScheme))

const config = new Settings("GuildUtils", defaultConf, currentScheme)
    .setCommand("gu settings", ["guildutils settings"])

scheme.Amaterasu.background.color = config.settings.bgColor
FileLib.write("GuildUtils", currentScheme, JSON.stringify(scheme, null, 4))

config
    .setPos(config.settings.x, 10.5)
    .setSize(config.settings.width, 75)
    .setScheme(currentScheme)
    .apply()

export default config.settings
