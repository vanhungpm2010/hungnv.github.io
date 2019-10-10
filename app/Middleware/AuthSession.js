'use strict'

const Route = use('Route');
const globals = require('globals');

class AuthSession {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({ request, response, session }, next) {

        // call next to advance the request
        if (!session.get('data'))
            return response.redirect(Route.url('login'));

        globals.token = session.get('data').token;

        await next();
    }

    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async wsHandle({ request }, next) {
        // call next to advance the request
        await next();
    }
}

module.exports = AuthSession;
