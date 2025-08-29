# Guild-Utils-ChatTriggers-Module
A Collection of chaos made to make running and specificially recruiting for a hypixel (skyblock) guild easier!

The main functionallity is /gu lobby which allows you to scan all players in your render distance for anyone above a level you set. Currently it only supports level requirements but I am intrested in the future in adding networth requirements too since some guilds still use networth as their main requirements.

Although mainly focusing on lobby recruiting there are also options (/gu player <player>) to get guild info on a specified player.

Then there is also a feature to shift punch players (/gu shiftpunch) to get their guild info if your near them. Some people prefer a more personalized lobby recruiting and this helps with that because it allows them to only check people if they can see them ingame so they can recruit *face to face* or as close to it as you can get in a video game.

But just because it is mainly made for recruiting doesnt mean it doesnt have any functionallity for actually running a guild too! Theres a command (/gu trusted) that allows you to configure it to promote and demote players automatically to a rank "*Trusted*" although being called trusted as a common name for a guild rank it can be set to any rank. 
This allows you to configure a amount of time (optional) and a level (also optional) a player needs to be to achieve the "Trusted" rank. 
This can be commonally used if you have a secondary guild rank that has a requirement to get. It allows you to automatically find people who are above these requirements and promote them.

Another thing it attempts to automate is kicking the lowest lvl gexp or ratio of the two, members from the guild. This is only really made to find low level players mainly while ingame. Its a bit easier and more live than skykings so it speeds up the proccess of recruiting new members.

The main commands that do something are
/gu lobby
/gu player <Username>
/gu trusted
/gu shiftpunch
/kickq <xp, lvl, ratio>
/gu apicount 
/gu help

I plan to add a settings gui in the future (its already in progress) but for the time being most of the congifuration comes from commands.

/gu api <key> | This is how you set your api key that will be used for all the hypixel api calls
/gu minlevel <lvl> | The lowest level players to check for guild information when using /gu lobby
/gu reply4guilded | Toggles if /gu lobby only shows you people who are not in a guild or if it shows you anyones guild info above the minimum lvel
/gu kickqlength | Sets how many people to show in /kickq up to 125 to see the whoe guilds ranking

Trusted Commands:
/gu defaultrank <rank name> | For most guilds this is just "Member" but you can change it to whatever if its not for your guild
/gu trustedrank <rank name> | Same as default rank but lets you set the name of your trusted rank
/gu trustlevel <lvl> | Sets what level someone needs to be to be your guilds Trusted rank
/gu trusttime <time in days> | Sets the amount of time in days someone has to be in the guild to have your guilds Trusted rank
