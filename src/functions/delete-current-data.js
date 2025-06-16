const { app } = require('@azure/functions');
const {RegisterTableHandler} =  require('../handlers/RegisterTableHandler')
const {RegisterTableService} =  require('../services/RegisterTableService')    
const {CosmosService} =  require('../services/CosmosService') 

app.http('delete-current-data', {
    methods: ['POST'],
    authLevel: 'Function',
    handler: async (request, context) => {
        const cosmosService = new CosmosService(process.env.DATABASE, process.env.COLLECTION_CHECKIN);
        const deletedData = await cosmosService.deleteAll()
        return {satus:"Sucess",body:`Deleted data ${deletedData}`};
    }
});
