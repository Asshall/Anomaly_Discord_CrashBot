# A bot to end all bots

> Carefull this is very much WIP do not use for production

This bot is cribbing a lot of code from this [repo](https://github.com/Vikbor5342/Minecraft-Crash-Log-Discord-Bot) make sure to go take a look !

## How to use
```bash
# Starting the dev container
docker-compose -p your_network_name -f compose-dev.yml -d up
docker exec -it dev-efp /bin/bas # Starting a shell inside the container

# Starting the prod container
docker-compose -f compose-prod.yml -d up
```

## Configuring
### Dev
*/.env*
```bash
token="token-goes-here"
cliendId="id-goes-here"
```

### Prod
*/src/config.json*
```json
{
    "token": "token-goes-here"
    "cliendId": "id-goes-here"
}
```
