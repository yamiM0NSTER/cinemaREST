# User
This API allows you to manage users.

## Request Method
Create user `POST`

Update user `PATCH`

Delete user `DELETE`

Show user `GET`

Show list of users `GET`

## Endpoint
Create/Update/Delete/Show user http://localhost:3000/users/[ID]

ID - user ID

Show list of users http://localhost:3000/users/

## Parameters

Any field in the user object
### User Object

Key | Type | Description
----|------|------------
id | string | User ID
firstName | string | First name of the user
lastName | string | Last name of the user
email | string | email
password | string | password
permissionLevel | PermissionLevel | Permission Level of user

### Special types
#### PermissionLevel
 - NORMAL_USER - cinema worker
 - ADMIN - system administrator


## Requires Authentication
Yes(ADMIN)