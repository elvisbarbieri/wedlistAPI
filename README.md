# Guest Management System API

A Node.js service for managing guest information, table assignments, and check-ins using Cosmos DB (MongoDB API).

## Services Overview

### 1. SearchService
Provides functionality to search guests by various parameters.

**Methods:**
- `searchByParam(params)` - Searches guests based on specified parameters
  - Supported params:
    - `table_id`: Find guests by table number
    - `guest_id`: Find guest by ID
    - `guest_name`: Find guest by name
    - `is_kid`: Filter kids/adults (true/false)
    - `all`: Get all guests (with optional presence filter)
- `getFullList(isPresent)` - Retrieves all guests with optional presence filtering
- `validateInput(params)` - Validates search parameters
- `closeConnection()` - Closes database connection

### 2. RegisterTableService
Handles table registration and guest assignments.

**Methods:**
- `registerTables(guests)` - Creates new table assignments with guests
- `validateFields(body)` - Validates input data structure
- Automatically closes connection after operations

### 3. CheckinService
Manages guest check-in functionality.

**Methods:**
- `checkin(data)` - Updates check-in status for specified guests
- `validateInput(params)` - Validates check-in data
- `closeConnection()` - Closes database connection

### 4. CosmosService
Database service layer for Cosmos DB (MongoDB API) operations.

**Key Methods:**
- `getById(id)` - Find guest by ID
- `getByTableId(tableId)` - Find guests by table number
- `getByName(guestName)` - Find guests by name
- `kidsFilter(isKid)` - Filters kids/adults
- `getAll()` - Retrieves all guests
- `createItem(items)` - Creates new records
- `userCheckIn(guestsName)` - Updates check-in status
- `updateTable(id, arrayFilters)` - Updates specific table data
- `deleteAll()` - Clears all data (use with caution)
- `connect()`/`close()` - Manages database connections

## Data Structure

Guest records follow this general structure:
```json
{
  "_id": ObjectId,
  "table_id": "string",
  "guests": [
    {
      "name": "string",
      "is_kid": boolean,
      "check_in": boolean
    }
  ]
}
