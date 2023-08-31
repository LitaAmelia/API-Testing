const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    apiUrl: 'https://gorest.co.in/public/v2',
    apiToken: process.env.API_TOKEN
};