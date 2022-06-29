const fs = require("fs")
const Discord = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const config = require("./config.js")
const { clientId, guild } = require("./config.js")
const commands = []
const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith(".js"));

for(const file of slashcommandsFiles){
  const slash = require(`./slashcmd/${file}`)
  commands.push(slash.data.toJSON())
}

const rest = new REST({ version: "9" }).setToken("OTg4NjY2Mjc3MDQ2Mzk0OTAw.GaKO04.vecNlHdsf8f1rOfahNtfn2Tt0K9Acyqj67dkBs")

createSlash()

async function createSlash(){
  try {
    await rest.put(
      Routes.applicationCommands(clientId, guild), {
        body: commands
      }
    )
    console.log("Slash commands agregados.")
  } catch(e) {
    console.error(e)
  }
}