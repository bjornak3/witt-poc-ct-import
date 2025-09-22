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
    projectKey: getRequiredEnvVar('CTP_PROJECT_KEY'),
    clientId: getRequiredEnvVar('CTP_CLIENT_ID'),
    clientSecret: getRequiredEnvVar('CTP_CLIENT_SECRET'),
    apiUrl: getRequiredEnvVar('CTP_API_URL'),
    authUrl: getRequiredEnvVar('CTP_AUTH_URL'),
    scopes: (process.env.CTP_SCOPE || '').split(','),
    region: getRequiredEnvVar('CTP_REGION'),
};