'use strict'

const Api = use('App/Helpers/Api');

class BaseController {

    constructor() {
        this.req = new Api;
    }
}

module.exports = BaseController