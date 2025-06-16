const {AzureUtils} = require('../utils/AzureUtils');

class SearchHandler {

    constructor(searchService) {
        this.searchService= searchService;
    }

    async execute(request,context) {
        try {

            const params = await request.json();
            this.searchService.validateInput(params);
            let response = await this.searchService.searchByParam(params);
            this.searchService.closeConnection();
            return AzureUtils.createResponse(200,{tables:response})
        }
        catch (error) {
            return AzureUtils.createResponse(400, {status:"Bad Request",error:`${error.message}`});
        }
          
     }
}           
module.exports= {SearchHandler};