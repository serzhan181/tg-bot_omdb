require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const { getMovie } = require('./api')
const { startHTML, helpHTML, formatMovieHTML } = require('./HTMLresponse')
const { gci, handleMovieResponse } = require('./helper') // gci = get chat id

const bot = new TelegramBot(process.env.TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
})
const availableTypes = ['episode', 'movie', 'series']

// Commands
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(gci(msg), startHTML, { parse_mode: 'HTML' })
})

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(gci(msg), helpHTML, { parse_mode: 'HTML' })
})

bot.onText(/\/year (.+)/, (msg, [source, match]) => {
  const year = match.split(' ')[0]
  const movieName = match.split(' ')[1]

  if (!Number(year)) {
    return bot.sendMessage(gci(msg), `Type year of release, not "${year}"`)
  }

  getMovie(movieName, year).then((movie) => {
    return handleMovieResponse(bot, msg, movie, formatMovieHTML)
  })
})

bot.onText(/\/type (.+)/, (msg, [source, match]) => {
  const type = match.split(' ')[0]
  const movieName = match.split(' ')[1]

  if (!availableTypes.includes(type)) {
    bot.sendMessage(gci(msg), `There's no such type as "${type}"!`)
  }

  getMovie(movieName, null, type).then((movie) => {
    return handleMovieResponse(bot, msg, movie, formatMovieHTML)
  })
})

// Main
bot.on('message', (msg) => {
  if (msg.text.includes('/')) {
    return null
  }

  getMovie(msg.text).then((movie) => {
    return handleMovieResponse(bot, msg, movie, formatMovieHTML)
  })
})
