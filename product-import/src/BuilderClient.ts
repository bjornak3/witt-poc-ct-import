import { config } from "./config/environment";

import {
    ClientBuilder,
    // Import middlewares
    type AuthMiddlewareOptions, // Required for auth
    type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/ts-client';


// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.' + config.region +'.gcp.commercetools.com',
    projectKey: config.projectKey,
    credentials: {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
    }
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.'+ config.region +'.gcp.commercetools.com'
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
