const {AzureUtils} = require('../utils/AzureUtils');

class CheckinHandler {

    constructor(service) {
        this.service= service;
    }

    async execute(request,context) {
        try {
            const params = await request.json();
            this.service.validateInput(params);
            let response = await this.service.checkin(params);
            this.service.closeConnection();
            return AzureUtils.createResponse(200,{tables:response})
        }
        catch (error) {
            return AzureUtils.createResponse(400, {status:"Bad Request",error:`${error.message}`});
        }
          
     }
}           
module.exports= {CheckinHandler};