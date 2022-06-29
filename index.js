const Discord = require("discord.js")
const client = new Discord.Client({ intents: 32767 })
const { readdirSync } = require("fs")
const fs = require("fs")
const keepAlive = require("./server.js")
const express = require("express")().get("/", (req, res)=> res.send("Bot Activo.")).listen(3000)
const config = require("./config.js")
let chalk = require("chalk")
const fetch = require("node-superfetch")


client.on("ready", async () => {
  client.user.setPresence({
    status: "online",
    activities: [{
      name: "twitch.tv/x_frede",
      type: "WATCHING",
    }]
  })
  console.log(`Sistema iniciando ${client.user.username}`);
  console.log(`Sistema encendido ${process.version}`);

  client.channels.cache.get("990153794375520297").messages.fetch("990154330332086272").then(msg => {
    let ifilter = i => !i.user.bot;

    const collector = msg.createMessageComponentCollector({ filter: ifilter })

    collector.on("collect", async i => {
      if(i.customId === "twitter"){
        if(!i.member.roles.cache.has("990148887127928915")){
         await i.member.roles.add("990148887127928915")
          i.reply({ content: "<:check:990159000010100736> **| ¡Rol <@&990148887127928915> agregado correctamente!**", ephemeral: true})
        } else {
          i.reply({ content: "<:incorrecto:990160136268042250> **| Ya tienes el rol <@&990148887127928915>.**", ephemeral: true})
        }
      }

      if(i.customId === "instagram"){
        if(!i.member.roles.cache.has("990148917133979659")){
          await i.member.roles.add("990148917133979659")
          i.reply({ content: "<:check:990159000010100736> **| ¡Rol <@&990148917133979659> agregado correctamente!**", ephemeral: true})
        } else {
          i.reply({ content: "<:incorrecto:990160136268042250> **| Ya tienes el rol <@&990148917133979659>.**", ephemeral: true})
        }
      }

      if(i.customId === "anuncios"){
        if(!i.member.roles.cache.has("990148956069707816")){
          await i.member.roles.add("990148956069707816")
          i.reply({ content: "<:check:990159000010100736> **| ¡Rol <@&990148956069707816> agregado correctamente!**", ephemeral: true})
        } else {
          i.reply({ content: "<:incorrecto:990160136268042250> **| Ya tienes el rol <@&990148956069707816>.**", ephemeral: true })
        }
      }
    })
  })

  client.channels.cache.get("988721683307311144").messages.fetch("990666466875564063").then(msg => {
    let ifilter = i => !i.user.bot;

    const collector = msg.createMessageComponentCollector({ filter: ifilter })

    collector.on("collect", async i => {
      if(i.customId === "verificar"){
        if(!i.member.roles.cache.has("988660109741789204")){
          await i.member.roles.add("988660109741789204")
          i.reply({ content: "<:verify:990121299940634644> **| ¡Haz sido verificad@ correctamente! Disfruta del servidor.**", ephemeral: true})
        } else {
          i.reply({ content: "<:KirmiziUnlem:990677132244054147> **| ¡Ya estás verificado!**", ephemeral: true})
        }
      }
    }) 
  })

  client.channels.cache.get("990153891024887828").messages.fetch("990770523313152101").then(msg => {
    let ifilter = i => !i.user.bot;

    const collector = msg.createMessageComponentCollector({ filter: ifilter })

    collector.on("collect", async i => {
      if(i.customId === "rojo"){
        if(!i.member.roles.cache.has("990766198725677116")){
          await i.member.roles.add("990766198725677116")
          i.reply({ content: "<:check:990159000010100736> **| ¡Rol <@&990766198725677116> agregado correctamente!**", ephemeral: true })
        } else {
          i.reply({ content: "<:incorrecto:990160136268042250> **| Ya tienes el rol <@&990766198725677116>.", ephemeral: true })
        }
      }

      if(i.customId === "azul"){
        if(!i.member.roles.cache.has("990766247585140796")){
          await i.member.roles.add("990766247585140796")
          i.reply({ content: "<:check:990159000010100736> **| ¡Rol <@&990766247585140796> agregado correctamente!**", ephemeral: true })
        } else {
          i.reply({ content: "<:incorrecto:990160136268042250> **| Ya tienes el rol <@&990766247585140796>.", ephemeral: true })
        }
      }

      if(i.customId === "amarillo"){
        if(!i.member.roles.cache.has("990766404397576222")){
          await i.member.roles.add("990766404397576222")
          i.reply({ content: "<:check:990159000010100736> **| ¡Rol <@&990766404397576222> agregado correctamente!**", ephemeral: true })
        } else {
          i.reply({ content: "<:incorrecto:990160136268042250> **| Ya tienes el rol <@&990766404397576222>.", ephemeral: true })
        }
      }

      if(i.customId === "verde"){
        if(!i.member.roles.cache.has("990766445199765514")){
          await i.member.roles.add("990766445199765514")
          i.reply({ content: "<:check:990159000010100736> **| ¡Rol <@&990766445199765514> agregado correctamente!**", ephemeral: true })
        } else {
          i.reply({ content: "<:incorrecto:990160136268042250> **| Ya tienes el rol <@&990766445199765514>.", ephemeral: true })
        }
      }
      
    })
  })

  const mongo = require('mongoose')
mongo.connect(config.mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(console.log(
    chalk.white('['),
    chalk.green('MongoDB'),
    chalk.white(']'),
    chalk.gray(':'),
    chalk.white('Connected')
  ));

  client.on("messageDelete", async(message) => {
    const snipe = require("./Schemas/snipeSchema")

    let data = await snipe.findOne({ channelId: message.channel.id })

    if(!data){

      let newdata = new snipe({
        channelId: message.channel.id,
        message: message.content,
        author: message.author.tag,
        time: Math.floor(Date.now() / 1000)
      })

      return await newdata.save()
    }

    await snipe.findOneAndUpdate({
      channelId: message.channel.id,
      message: message.content,
      author: message.author.tag,
      time: Math.floor(Date.now() / 1000)
    })
  })

});

client.commands = new Discord.Collection()

 const commandFolders = readdirSync("./comandos");
  for(const folder of commandFolders) {
    const commandFiles = readdirSync(`./comandos/${folder}`).filter(files => files.endsWith(".js"));
    for(const file of commandFiles) {
      const command = require(`./comandos/${folder}/${file}`);
      client.commands.set(command.name, command);
    }

  }

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith(".js"))

for(const file of slashcommandsFiles){
  const slash = require(`./slashcmd/${file}`)
  console.log(`Slash commands - ${file} cargado.`)
  client.slashcommands.set(slash.data.name, slash)
}
client.on("interactionCreate", async(interaction) => {
  if(!interaction.isCommand()) return;

  const slashcmds = client.slashcommands.get(interaction.commandName)

  if(!slashcmds) return;

  try {
    await slashcmds.run(client, interaction)
  } catch(e) {
    console.error(e)
  }
})

client.on("messageCreate", async (message) => {
  let prefix = "!"

  if(message.author.bot) return;

  if(!message.content.startsWith(prefix)) return;

  if(message.channel.type === "dm") return;
  

  const usuario = message.author
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
const command = args.shift().toLowerCase()//En mi canal explico porque se me olvido 


  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));

  if(cmd){
    try {
   cmd.execute(client, message, args, prefix)
    } catch (e) {
      message.reply("El sistema tuvo un error al cargar el __**COMANDO**,__.")
    }

  }
  
  if(!cmd){
    message.reply(`:x: | **Comando no encontrado.**`)
  
  }

});

client.login(process.env.TOKEN)