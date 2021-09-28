# Shisho - Server

Express.js Server providing the local backend for Shisho. Provides a Database wrapper for use with the Shisho Chrome Extension.

### Sqlite3

Uses Sqlite3 as the storage layer. This is a simple file-system database recording structured data in a local text file. This file should be archived along with the Media files.

### Endpoints

`GET /version` - Returns the Server version. Useful for alive checks.

`GET /media/list` - List all registered Media

`GET /media/:id` - Fetch the details of the Media Record with this ID

`POST /media/search` - Searches Media records for any that match the given critieria (Often used to check if a URL/Image has already been recorded)

`POST /media/add` - Add a new Media record with the information specified in the request body

`POST /media/delete` - Delete the Media record with the specified ID

`POST /media/reconcile/:id` - Updates the Media record with the specified ID with the parameters in the request body and marks the record 'reconcilled'

`POST /media/update/:id` - Updates the details of the Media record with the specified ID
