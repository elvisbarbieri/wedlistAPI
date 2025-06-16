const { app } = require('@azure/functions');
const {CheckinHandler} =  require('../handlers/CheckinHandler')
const {CheckinService} =  require('../services/CheckinService')    
const {CosmosService} =  require('../services/CosmosService') 

app.http('check-in', {
    methods: ['POST'],
    authLevel: 'Function',
    handler: async (request, context) => {
        const cosmosService = new CosmosService(process.env.DATABASE, process.env.COLLECTION_CHECKIN);
        const service = new CheckinService(cosmosService);
        const checkinHandler = new CheckinHandler(service);
       return await checkinHandler.execute(request, context);
    }
});
