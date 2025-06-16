const { SearchMapper } = require('../mappers/SearchMapper');

class SearchService {

    constructor(cosmosService) {
        this.cosmosService = cosmosService;
        this.mapper = new SearchMapper();
    }

    validateInput(params) {
        if (!params.param) {
            throw new Error('Param is required');
        }
    }

    async closeConnection() {
        await this.cosmosService.close();
    }

    async searchByParam(params) {
        const { value, param } = params;
        let response;
        if (param === "table_id") {
            response = await this.cosmosService.getByTableId(value);
        }
        else if (param === "guest_id") {
            response = await this.cosmosService.getById(value);
        }
        else if (param === "guest_name") {
            response = await this.cosmosService.getByName(value);
        }
        else if (param === "is_kid") {
            response = await this.cosmosService.kidsFilter(value);
        }
        else if (param == "all") {
            response = await this.getFullList(value);
        }
        else {
            throw new Error('Invalid param');
        }

        return response;
    }

    async getFullList(isPresent) {
        let filteredGuests;
        let data = await this.cosmosService.getAll();
        console.log(JSON.stringify(data));

        if (isPresent == "true") {
            filteredGuests = this.mapper.mapPresentGuest(data);
        }
        else if (isPresent == "false") {
            filteredGuests = this.mapper.mapNonPresentGuest(data);
        }
        else {
            filteredGuests = this.mapper.mapAll(data);
        }
        return filteredGuests;
    }
}
module.exports = { SearchService };