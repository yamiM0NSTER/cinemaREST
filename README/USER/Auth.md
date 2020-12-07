# Auth
This API allows you to login and receive JWT token.

## Request Method
Login `POST`

## Endpoint
http://localhost:3000/auth

## Parameters
Key | Type | Description
----|------|------------
email | string | email
password | string | password

## Requires Authentication
yes

## What should happen
Upon successful authentication, server should send json response with accessToken eg.:

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmNjZmEyYTAwYTNmYTA4YTRlNDliYWUiLCJlbWFpbCI6ImpvbWV4NTBAZ21haWwuY29tIiwiaWF0IjoxNjA3MzMwMDQ0LCJleHAiOjE2MDczMzM2NDR9.gcW89i2L3fG5FQptOG8QGLXYjoXrH_CPywy1gIGsEV0"
}
```
Then you put that token in headers sent to server in key `auth`. Upon accessing any endpoint that requires authentication, new token is generated and sent in headers in key `token`.