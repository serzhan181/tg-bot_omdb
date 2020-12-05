require('dotenv').config()
const { default: Axios } = require('axios')

async function getMovie(name, year, type) {
  let res = null
  if (year) {
    res = await Axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API}&t=${name}&y=${year}`
    )
  } else if (type) {
    res = await Axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API}&t=${name}&type=${type}`
    )
  } else {
    res = await Axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API}&t=${name}`
    )
  }

  if (res.data.Response === 'False') {
    return 'Error'
  }

  return res.data
}

module.exports = {
  getMovie,
}
