const { app } = require('@azure/functions');
const {RegisterTableHandler} =  require('../handlers/RegisterTableHandler')
const {RegisterTableService} =  require('../services/RegisterTableService')    
const {CosmosService} =  require('../services/CosmosService') 

app.http('register-table', {
    methods: ['POST'],
    authLevel: 'Function',
    handler: async (request, context) => {
        const cosmosService = new CosmosService(process.env.DATABASE, process.env.COLLECTION_CHECKIN);
        const service = new RegisterTableService(cosmosService);
        const registerTableHandler = new RegisterTableHandler(service);
       return await registerTableHandler.execute(request, context);
    }
});
