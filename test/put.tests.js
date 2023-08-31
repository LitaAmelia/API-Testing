const chai = require('chai');
const supertest = require('supertest');
const config = require('../config/config.js');
const { default: axios } = require('axios');
const {expect} = chai;
const { addedUser } = require('./post.tests.js');

chai.use(supertest);

describe('Go REST PUT request', function() {
    //Positive
    it('Should update user details', async function() {
        if (!addedUser) {
            throw new Error('User not created');
        }

        const updatedUserData = {
            name: 'Lita Aja',
            email: 'updated@example.com',
        };

        const response = await axios.put(`${config.apiUrl}/users/${addedUser}`, updatedUserData, {
            headers: {
                Authorization: `Bearer ${config.apiToken}`
            }
        });

        expect(response.status).to.equal(200);
        const responseData = response.data.data;

        for (const property in updatedUserData) {
            expect(responseData).to.have.property(property, updatedUserData[property]);
        }
    });

    //Negative
    it('Should fail to update user details (User Not Found)', async function() {
        const invalidUserId = 'invalidUserId';

        const updatedUserData = {
            name: 'Lita Aja',
            email: 'updated@example.com',
        };

        try {
            const response = await axios.put(`${config.apiUrl}/users/${invalidUserId}`, updatedUserData, {
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