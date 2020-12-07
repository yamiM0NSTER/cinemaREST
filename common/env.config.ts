
export default {
    port: 3000,
    appEndpoint: "http://localhost:3000",
    apiEndpoint: "http://localhost:3000",
    jwt_secret: "myS33!!creeeT",
    jwt_expiration_in_seconds: 36000,
    environment: "dev",
    permissionLevels: {
        NORMAL_USER: 1,
        ADMIN: 2048
    },
    dbEndpoint: "mongodb://localhost:27017/kinoREST",
}