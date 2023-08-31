const chai = require('chai');
const supertest = require('supertest');
const config = require('../config/config.js');
const { default: axios } = require('axios');
const {expect} = chai;
const { addedUser } = require('./post.tests.js');

chai.use(supertest);

describe('Go REST GET request', function() {
    //Positive
    it('Should successfully retrieve the added data', async function() {
        const response = await axios.get(`${config.apiUrl}/users/${addedUser}`, {
            headers: {
                Authorization: `Bearer ${config.apiToken}`
            }
        });

        expect(response.status).to.equal(200);

    })

    //Negative
    it('Should fail to get detail users (User Not Found)', async function() {
        const invalidUserId = 'invalidUserId';

        try {
            const response = await axios.get(`${config.apiUrl}/users/${invalidUserId}`, {
                headers: {
                    Authorization: `Bearer ${config.apiToken}`
                }
            });

            expect(response.status).not.to.equal(200);
        } catch (error) {
            expect(error.response).to.exist;
            expect(error.response.status).to.equal(404);
            expect(error.response.data).to.have.property('message', 'Resource not found');
        }
    });
})