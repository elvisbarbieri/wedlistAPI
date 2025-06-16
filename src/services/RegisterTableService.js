    class RegisterTableService {

        constructor(cosmosService) {     
            this.cosmosService = cosmosService;
        }

        validateFields(body) {
            if (!Array.isArray(body)) {
                throw new Error("Tables array is required");
            }
        }    

        async registerTables(guests) {
            try {
                let response = await this.cosmosService.createItem(guests);
                await this.cosmosService.close();
                return response;
            } 
            catch (error) {
                await this.cosmosService.close();
                throw new Error(error.message);
            }
        }



    }

    module.exports = {RegisterTableService};