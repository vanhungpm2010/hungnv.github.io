'use strict'

const BaseController = use('BaseController');

class SurveyController extends BaseController {

    async survey({ request, response, view }) {
        const input = request.all();

        try {
            // console.log(data.length);
            if (request.request.method === 'POST') {

                const params = {
                    page: input.pagination.page,
                    perpage: input.pagination.perpage
                }

                // let result = [];
                // const limit = parseInt(params.perpage), page = params.page;

                // const index = (page - 1) * limit;

                // for (let i = index; i < (index + limit); i++) {
                //     // console.log(temp[i]);
                //     result.push(temp[i]);
                // }

                // call api login
                const result = await this.req.getSurvey(params);
                if (result) return result.data;

                const data = {
                    meta: {
                        page: page,
                        pages: temp.length / limit,
                        total: temp.length,
                        perpage: limit
                    },
                    result: result
                }
                return data;
            }

            return view.render('page/survey');

        } catch (error) {
            throw error;
        }
    }
}

module.exports = SurveyController
