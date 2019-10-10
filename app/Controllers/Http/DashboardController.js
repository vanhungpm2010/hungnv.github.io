'use strict';

const BaseController = use('BaseController');

class DashboardController extends BaseController {

    async dashboard({ request, response, view }) {

        return view.render('home');

    }
}

module.exports = DashboardController;
