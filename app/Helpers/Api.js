'use strict'

const Env = use('Env');
const axios = require('axios');
const globals = require('globals');



class Api {
    constructor() {
        if (!this.instance) {
            this.instance = axios.create({
                baseURL: Env.get('API_BACK_URL'),
                timeout: 10000
            });
        }
    }

    async getInstance() {

        if (!this.instance)
            throw new Error('Api not create');

        if (!this.instance.token) {
            if (globals.token) {
                this.instance['token'] = globals.token;
                this.instance.defaults.headers.common['Authorization'] = this.instance['token'];
            }
        }

        return this.instance;
    }

    auth() {

    }

    async login(params) {

        try {
            const request = await this.getInstance();
            const data = await request.post('/auth/login', params);

            return data;

        } catch (error) {
            throw error;
        }

    }

    async getSurvey(params) {

        try {
            const request = await this.getInstance();
            const data = await request.get('/v1/survey', { params });

            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Api;