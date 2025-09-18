import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface Config {
    projectKey: string;
    clientId: string;
    clientSecret: string;
    apiUrl: string;
    authUrl: string;
    scopes: string[];
    region: string;
}

function getRequiredEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required but not set`);
    }
    return value;
}

export const config: Config = {
    projectKey: getRequiredEnvVar('COMMERCETOOLS_PROJECT_KEY'),
    clientId: getRequiredEnvVar('COMMERCETOOLS_CLIENT_ID'),
    clientSecret: getRequiredEnvVar('COMMERCETOOLS_CLIENT_SECRET'),
    apiUrl: getRequiredEnvVar('COMMERCETOOLS_API_URL'),
    authUrl: getRequiredEnvVar('COMMERCETOOLS_AUTH_URL'),
    scopes: (process.env.COMMERCETOOLS_SCOPES || '').split(','),
    region: getRequiredEnvVar('COMMERCETOOLS_REGION'),
};