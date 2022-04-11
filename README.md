# A bot to end all bots

[DockerHub](https://hub.docker.com/repository/docker/asshall/anomaly-discord-crashbot)

> This is a beta version... Don't deploy if your not ready to
> provide support

This bot is cribbing a lot of code from this [repo](https://github.com/Vikbor5342/Minecraft-Crash-Log-Discord-Bot) make sure to go take a look !

## Disclaimer
This was developped with [EFP](https://discord.gg/heZjwdMY)
logs in mind. Never tested with vanilla logs

## How to use
```bash
# Starting the dev container
docker-compose -p your_network_name -f compose-dev.yml run dev-bot
npm dev

# Starting the prod container
docker-compose -f compose-prod.yml up -d
```

## Configuring
All strings are in `/src/strings.yml`

All config are in `/src/config.yml`

Script list (used to exclude vanilla script for the sumarry) is in `/src/lexers/vannillaScripts.js`, follow the instruction on the last line do decouple efp scripts

### Secrets
#### Dev
`/.env`
```bash
token="token-goes-here"
cliendId="id-goes-here"
guildId="id-goes-here"
reportChannelId="id-goes-here"
```

#### Prod
`/src/secrets.json`
```json
{
    "token": "token-goes-here",
    "cliendId": "id-goes-here",
    "guildId": "id-goes-here"
    "reportChannelId": "id-goes-here"
}
```
## Legal stuff
Don't know anything about legal so if the current state of the repo doesn't let you do what you want, tell me.
You may use this code and contribute how you see fit with one
exception. **Don't use it for financial gains please**.
