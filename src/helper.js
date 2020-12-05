function gci(msg) {
  return msg.chat.id
}

function formatMovieResponse(data) {
  const res = {
    Title: data.Title,
    Year: data.Year,
    Rated: data.Rated,
    Genre: data.Genre,
    Country: data.Country,
    Rating: data.imdbRating,
    Lasts: data.Runtime,
    Type: data.Type,
    Poster: data.Poster,
  }

  if (data.Type === 'series') res.totalSeasons = data.totalSeasons

  return res
}

function handleMovieResponse(bot, msg, movieResponse, htmlFunction) {
  if (movieResponse === 'Error') {
    return bot.sendMessage(msg.chat.id, `film/series not found.`)
  }

  return bot.sendMessage(msg.chat.id, htmlFunction(movieResponse), {
    parse_mode: 'HTML',
  })
}

module.exports = {
  gci,
  formatMovieResponse,
  handleMovieResponse,
}
