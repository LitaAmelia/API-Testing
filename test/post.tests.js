const chai = require('chai');
const supertest = require('supertest');
const config = require('../config/config.js');
const { default: axios } = require('axios');
const {expect} = chai;

chai.use(supertest);

describe('Go REST POST request', function() {
    let addedUser;

    //Positive
    it('Should create data successfully', async function() {
        const newUser = {
            name: 'Lita Amelia',
            email: 'userbeneran1@example.com',
            gender: 'female',
            status: 'active'
        };

        const response = await axios.post(`${config.apiUrl}/users`, newUser, {
            headers: {
                Authorization: `Bearer ${config.apiToken}`
            }
        });

        expect(response.status).to.equal(201);
        const addedUser = response.data.id;
        console.log(addedUser);
    })

    //Negative
    it('Should failed to create user', async function() {
        createUserBlankField = {
            name: '',
            email: '',
            gender: '',
            status: ''
        };

        try {
            const response = await axios.post(`${config.apiUrl}/users`, createUserBlankField, {
                headers: {
                    Authorization: `Bearer ${config.apiToken}`
                }
            });

            expect(response.status).not.to.equal(201)
        } catch (error) {

            console.log(error.response.data);

            expect(error.response).to.exist;
            expect(error.response.status).to.equal(422);
            
            const errorArray = error.response.data;
            for (const errorObject of errorArray) {
                expect(errorObject).to.have.property('message');
            }
        }
    })

    //Positive
    it('Should failed to create user with invalid email', async function() {
        createUserBlankField = {
            name: 'Selaras',
            email: 'invalid',
            gender: 'male',
            status: 'active'
        };

        try {
            const response = await axios.post(`${config.apiUrl}/users`, createUserBlankField, {
                headers: {
                    Authorization: `Bearer ${config.apiToken}`
                }
            });

            expect(response.status).not.to.equal(201)
        } catch (error) {

            console.log(error.response.data);

            expect(error.response).to.exist;
            expect(error.response.status).to.equal(422);
            
            const errorArray = error.response.data;
            for (const errorObject of errorArray) {
                expect(errorObject).to.have.property('message');
            }
        }
    })

    //Negative
    it('Should fail to create data due to unauthorized access', async function () {
        const newData = { 
            name: 'Selaras Kasih',
            email: 'kasih@email.com',
            gender: 'female',
            status: 'active'
        };
        try {
            const response = await axios.post(`${config.apiUrl}/users`, newData, {
                headers: {
                    Authorization: 'Bearer InvalidToken' 
                }
            });
            expect(response.status).to.equal(201); 
        } catch (error) {
            expect(error.response.status).to.equal(401);
        }
    });

    module.exports = {
        addedUser
    };
})