class SearchMapper {

    map(tables) {
        tables.map((table) => {
            return {
                id: table["_id"],
                table_id: table?.table_id,
                guests: this.mapGuests(table.guests)
            }
        })
        return tables;
    }

    mapGuests(guests) {
        let allGuests = guests.map((guest) => {
            return {
                name: guest?.name,
                is_kid: guest?.is_kid,
                check_in: guest?.check_in,
                age: guest?.age,
                payment: guest?.payment
            }
        })
        return allGuests;
    }

    mapPresentGuest(tables) {
        let presentGuests = tables.map((table) => {
            let presents = (this.mapGuests(table.guests)).filter((guest) => guest.check_in == true);
            console.log(presents);
            return {
                id: table["_id"],
                table_id: table?.table_id,
                guests: presents
            }
        })
        return presentGuests;
    }

    mapNonPresentGuest(tables) {
        let nonPresentGuests = tables.map((table) => {
            let nonPresentGuests = (this.mapGuests(table.guests)).filter((guest) => guest.check_in == false);
            console.log(nonPresentGuests);
            return {
                id: table["_id"],
                table_id: table?.table_id,
                guests: nonPresentGuests
            }
        })
        return nonPresentGuests;
    }

    mapAll(tables) {
        let allGuests = tables.map((table) => {
            let allGuests = (this.mapGuests(table.guests));
            console.log(allGuests);
            return {
                id: table["_id"],
                table_id: table?.table_id,
                guests: allGuests
            }
        })
        return allGuests;
    }
}
module.exports = { SearchMapper };