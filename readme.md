# Build a Discord Bot with Discord.js

## TODO

# Astea sunt de pe coding garden
* [x] Setup project / dependencies
  * npm i discord.js dotenv
* [x] Setup eslint
  * npm i -D eslint
  * npx eslint --init
* [x] Create a Discord Application / Bot
  * https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
* [x] Add the bot to a Server
  * https://discordjs.guide/preparations/adding-your-bot-to-servers.html
* [x] Setup a basic bot
  * https://discordjs.guide/creating-your-bot/#creating-the-bot-file
* [x] Build an "echo" command
* [x] Build an "8 ball" command
* [x] Refactor to use a command handler
* [x] Build the "ping/pong" command
* [x] Build the "cats" command to get a random fact about cats from an api
* [ ] Build a "quotes" commands that will make the bot respond with a random quote a person from the server said
  * [ ] choose how the quote will be stored
  * [ ] choose what will trigger the quote to be stored
  * [ ] choose if the quote will accept params or not
* [ ] **For fun** Build a command like *!depresie* or *!da-mi depresie* which will return a depressing quote from the backend
* [ ] Build the functionality for the bot to do something when people react to a message with a certain emote (rublert)
  * [ ] create a backend application
  * [ ] create a database connection to mongodb
  * [ ] cache each server user and save their money
  * [ ] **optional** **desired tho** maybe create some sort of mechanism (cronjob) that will do in-memory cache of people's rublerts and run a single backend request to save all the data
* [ ] **Optional/Desired** Maybe at some point, create a Docker image for this and deploy it instead of full code deploy
## Resources

* [Discord.js Guide](https://discordjs.guide/)
* [Discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
  * [Discord.js Collection Documentation](https://discord.js.org/#/docs/main/stable/class/Collection)

* Eu vreau sa il fac cu typescript
* Imi trebuie niste comenzi de terminal ca sa pot avea **watch** pe typescript si sa compileze in js
* Trebuie sa vad ce types am nevoie sa folosesc
* Trebuie sa vad cum pot sa organizez codul mai ok
* **Poate scriu teste**????
  * nu stiu daca ar avea rost sau cum ar trebui sa testez conexiunea botului. Poate asta o sa fie **tema** pentru mai tarziu!!
  * o idee ar fi sa testez restul chestiilor pe care le scriu eu
* Comenzi:
  1. pt local: **npm run local**
  2. pt build: **npm run build**
  3. atunci cand aplicatia o sa fie intr-un container de docker si toate cele bune: **npm run start**