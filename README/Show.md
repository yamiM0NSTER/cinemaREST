# Show
This API allows you to manage shows.

## Request Method
Create show `POST`

Update show `PATCH`

Delete show `DELETE`

Show show `GET`

Show list of shows `GET`

Show list of shows for a room `GET`

## Endpoint
Create/Update/Delete/Show movie http://localhost:3000/shows/[ID]

Show list of movies http://localhost:3000/shows/

Show list of shows for a room http://localhost:3000/roomshows/[roomID]

ID - show ID
roomID - room ID

## Parameters

Any field in the show object
### Movie Object

Key | Type | Description
----|------|------------
id | string | show ID
startDate | Date | Start Date of the show
endDate | Date | End Date of the show
roomId | string | id of assigned room
movieId | string | id of assigned movie

## Requires Authentication
Yes