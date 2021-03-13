import * as dotenv from "dotenv";

dotenv.config();

export default {
    APP: process.env.APP || "dev",
    PORT: process.env.PORT || "3000",

    DB_DIALECT: process.env.DB_DIALECT || "mongo",
    // DB_HOST: process.env.DB_HOST || "mongodb+srv://example:Example123@cluster0.r7rtf.mongodb.net/test",
    DB_HOST: process.env.DB_HOST || "mongodb+srv://user2:sdsd1234@cluster2.ytpzg.mongodb.net",
    DB_NAME: process.env.DB_NAME || "test-db",
    DB_PASSWORD: process.env.DB_PASSWORD || "sdsd1234",
    DB_PORT: process.env.DB_PORT || "27017",
    DB_USER: process.env.DB_USER || "example",

    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || "jwt_key",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1m",
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10
}   