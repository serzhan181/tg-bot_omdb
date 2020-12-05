const { formatMovieResponse } = require('./helper')

const startHTML = `
<b>Hello! here you can search all about the movie you're searching for!</b>

Need help? /help
`

const helpHTML = `
<b>Main features:</b>
* {Name of the movie} = Search by name
* /year {year of the movie} {Name of the movie} = Search by year
* /type {type of the movie} {Name of the movie} = Search by type (movie, series)
`

function formatMovieHTML(movieData) {
  const template = formatMovieResponse(movieData)

  let res = `
  --------------------------------
  <b>Title</b>: ${template.Title}
  <b>Year</b>: ${template.Year}
  <b>Rated</b>: ${template.Rated}
  <b>Genre</b>: ${template.Genre}
  <b>Country</b>: ${template.Country}
  <b>Rating</b>: ${template.Rating}
  <b>Lasts</b>: ${template.Lasts}
  --------------------------------
  <i>Poster</i>: ${template.Poster}
  `

  if (template.Type === 'series') {
    res += `\n<b>Total Seasons</b>: ${template.totalSeasons}`
  }

  return res
}

module.exports = {
  helpHTML,
  startHTML,
  formatMovieHTML,
}
