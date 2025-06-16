const { app } = require('@azure/functions');
const {SearchHandler} =  require('../handlers/SearchHandler');
const {SearchService} =  require('../services/SearchService')    
const {CosmosService} =  require('../services/CosmosService') 

app.http('search', {
    methods: ['POST'],
    authLevel: 'Function',
    handler: async (request, context) => {
        const cosmosService = new CosmosService(process.env.DATABASE, process.env.COLLECTION_CHECKIN);
        const service = new SearchService(cosmosService);
        const searchHandler = new SearchHandler(service);
       return await searchHandler.execute(request, context);
    }
});
