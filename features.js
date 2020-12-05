// This is READme like file where i can mark some notes for telegram bot learning.

// To send HTML markup
bot.on('message', (msg) => {
  const html = `
    <strong>Hello, ${msg.from.first_name}</strong>
    <pre>
      ${JSON.stringify(msg, null, 2)}
    </pre>
    `

  bot.sendMessage(msg.chat.id, html, {
    parse_mode: 'HTML',
  })
})

// diable telegram behavior when it  parses the title of the site i am sending || disable notification
bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, 'youtube.com', {
    disable_web_page_preview: true,

    disable_notification: true,
  })
})

// Working with keyboard
bot.on('message', (msg) => {
  if (msg.text === 'Close') {
    bot.sendMessage(msg.chat.id, 'Closing...', {
      reply_markup: {
        remove_keyboard: true,
      },
    })
  } else if (msg.text === 'Reply') {
    bot.sendMessage(msg.chat.id, 'OK', {
      reply_markup: {
        // Пересланное сообщение
        force_reply: true,
      },
    })
  } else {
    bot.sendMessage(msg.chat.id, 'Keyboard', {
      // reply morkup means reply with keyboard
      reply_markup: {
        keyboard: [
          [
            {
              text: 'Send geo',
              request_location: true,
            },
          ],
          ['Reply', 'Close'],
          [
            {
              text: 'Contact',
              request_contact: true,
            },
          ],
        ],
        one_time_keyboard: true,
        // Appears only 1 time and automaticly closes after using
      },
    })
  }
})

// Working with inline keyboard
{
  bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, 'Inline keyboard', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'youtube', url: 'youtube.com' }],
          [
            { text: 'Reply', callback_data: 'reply' },
            { text: 'Forward', callback_data: 'forward' },
          ],
        ],
      },
    })
  })

  bot.on('callback_query', (query) => {
    // bot.sendMessage(query.message.chat.id, JSON.stringify(query, null, 2), {
    //   disable_web_page_preview: true,
    // })

    bot.answerCallbackQuery(query.id, `${query.data}`)
  })
}

// Inline queries (*unusual)
bot.on('inline_query', (query) => {
  const results = []

  for (let i = 0; i < 5; i++) {
    results.push({
      type: 'article',
      id: i.toString(),
      title: 'title ' + i,
      input_message_content: { message_text: 'Article ' + i },
    })
  }

  bot.answerInlineQuery(query.id, results, { cache_time: 0 })
})

// Mini-functionality bot
{
  const inlineKeyboard = [
    [
      {
        text: 'Forward',
        callback_data: 'forward',
      },
      {
        text: 'Reply',
        callback_data: 'reply',
      },
    ],
    [
      {
        text: 'Edit',
        callback_data: 'edit',
      },
      {
        text: 'Delete',
        callback_data: 'delete',
      },
    ],
  ]

  bot.onText(/\help/, (msg, [source, match]) => {
    bot.sendMessage(msg.chat.id, 'Keyboard', {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    })
  })

  bot.on('callback_query', (query) => {
    const { chat, message_id, text } = query.message

    switch (query.data) {
      case 'forward':
        // Where, from, what
        bot.forwardMessage(chat.id, chat.id, message_id)
        break

      case 'reply':
        console.log('repylting')
        bot.sendMessage(chat.id, 'Answering', {
          reply_to_message_id: message_id,
        })
        break

      case 'edit':
        bot.editMessageText(`${text} {edited}`, {
          chat_id: chat.id,
          message_id,
          reply_markup: { inline_keyboard: inlineKeyboard },
        })
        break

      case 'delete':
        bot.deleteMessage(chat.id, message_id)
        break

      default:
        break
    }

    bot.answerCallbackQuery({ callback_query_id: query.id })
  })
}

// Sending pictures, audios, documents etc
{
  bot.onText(/\/pic/, (msg) => {
    bot.sendPhoto(msg.chat.id, './cat.jpg', { caption: 'catty cat' })
  })

  bot.onText(/\/audio/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Loading...')

    fs.readFile(__dirname + '/music.mp3', (err, data) => {
      bot.sendAudio(msg.chat.id, data).then(() => {
        bot.deleteMessage(msg.chat.id, msg.message_id)
      })
    })
  })

  bot.onText(/\/doc1/, (msg) => {
    bot.sendDocument(msg.chat.id, './Ad_L1.docx')
  })

  bot.onText(/\/doc2/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Loading...')

    fs.readFile(__dirname + '/Ad_L2.docx', (err, file) => {
      bot.sendDocument(msg.chat.id, file).then(() => {
        bot.sendMessage(msg.chat.id, 'Finished')
      })
    })
  })

  bot.onText(/\/s1/, (msg) => {
    bot.sendSticker(msg.chat.id, './stick.webp')
  }) // NOTE: Telegram only support .webp format for stickers.

  bot.onText(/\/loc/, (msg) => {
    bot.sendLocation(msg.chat.id, 0, 0)
  })
}
