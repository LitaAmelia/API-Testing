const chai = require('chai');
const supertest = require('supertest');
const config = require('../config/config.js');
const { default: axios } = require('axios');
const {expect} = chai;
const { addedUser } = require('./post.tests.js');

chai.use(supertest);

describe('Go REST DELETE request', function() {
    //Positive
    it('Should delete user', async function() {
        if (!addedUser) {
            throw new Error('User not created'); 
        }

        const response = await axios.delete(`${config.apiUrl}/users/${addedUser}`, {
            headers: {
                Authorization: `Bearer ${config.apiToken}`
            }
        });

        expect(response.status).to.equal(204);
    });

    //Negative
    it('Should fail to delete user (User Not Found)', async function() {
        const invalidUserId = 'invalidUserId';

        try {
            const response = await axios.delete(`${config.apiUrl}/users/${invalidUserId}`, {
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