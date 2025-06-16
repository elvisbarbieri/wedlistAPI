const {AzureUtils} = require('../utils/AzureUtils');

class RegisterTableHandler{

    constructor(registerTableService) {
        this.registerTableService = registerTableService;
    }

    async execute(request,context) {
        try {
            let body = await request.json();
            this.registerTableService.validateFields(body);
            let guests = await this.registerTableService.registerTables(body);
            return AzureUtils.createResponse(200,guests);
        } catch (error) {
            return AzureUtils.createResponse(400, {status:"Bad Request",error:`${error.message}`});
        }
          
     }
}           
module.exports= {RegisterTableHandler};