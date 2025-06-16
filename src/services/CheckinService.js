const {SearchMapper} = require('../mappers/SearchMapper');

class CheckinService {   

    constructor(cosmosService) {     
        this.cosmosService = cosmosService;
        this.mapper = new SearchMapper();
    }

    validateInput(params) {
        if (!params.guests) {
            throw new Error('guests required');
        }
    }

    async closeConnection() {
      await this.cosmosService.close();
    }
    
    async checkin(data){
        const people=[];
        data.guests.map((guest)=>{
            people.push(guest.name);
        })
        return await this.cosmosService.userCheckIn(people);
    }

}
module.exports = {CheckinService};