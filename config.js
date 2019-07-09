const port = process.env.PORT || 3000
const apiKey = "e08b809fa16423ea9f9a329e8b727779"

const config = {
    baseURL: `http://localhost:` + port + '/api',
    port: port,
    apiKey: apiKey,
    baseTmdbURL: `https://api.themoviedb.org/3/`
}

module.exports = config