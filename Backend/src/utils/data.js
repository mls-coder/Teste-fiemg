const axios = require('axios');

countries = [
  "argentina",
  "brasil",
  "chile",
  "colombia",
  "paraguai",
  "peru",
  "suriname",
  "uruguai"
];

async function universitiesCountry(country) {
    try {
        const url = `http://universities.hipolabs.com/search?country=${country}`
        const response = await axios.get(url)
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.error(`Erro ao obter as universidades de ${country}:`, error)
        return
    }
}

function getAllUniversities() {
    try {
        const universities = Promise.all(countries.map(country => universitiesCountry(country)))
        return universities
    } catch (error) {
        console.error('Erro ao obter as universidades:', error)
        return
    }
}

module.exports = { getAllUniversities }