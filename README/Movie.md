# Movie
This API allows you to manage movies.

## Request Method
Create movie `POST`

Update movie `PATCH`

Delete movie `DELETE`

Show movie `GET`

Show list of movies `GET`

## Endpoint
Create/Update/Delete/Show movie http://localhost:3000/movies/[ID]

ID - movie ID

Show list of movies http://localhost:3000/movies/

## Parameters

Any field in the movie object
### Movie Object

Key | Type | Description
----|------|------------
id | string | Movie ID
Title | string | Title of the movie
Length | number | Length of the movie
Producer | string | Movie Producer

## Requires Authentication
Yes