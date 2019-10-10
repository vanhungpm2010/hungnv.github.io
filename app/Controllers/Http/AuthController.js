'use strict';

const BaseController = use('BaseController');
const Route = use('Route');

class AuthController extends BaseController {

    async login({ request, response, view, session }) {

        try {
            if (request.request.method === 'POST') {

                const input = request.only(['phone', 'password']);

                const result = await this.req.login(input);

                if (result) {
                    // save on session
                    session.put('data', result.data.data);
                    await session.commit();

                    return response.redirect(Route.url('dashboard'));
                }

            }

            session.flash({ notification: 'Wrong user phone or password!' });

            return view.render('login');
        } catch (error) {
            throw error;
        }
    }

    async logout({ response, session }) {

        try {

            session.clear();

            return response.redirect('login');

        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthController;
