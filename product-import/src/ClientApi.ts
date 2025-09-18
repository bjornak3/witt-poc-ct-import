import { ctpClient } from './BuilderClient';
import { config } from './config/environment';
import {
    ApiRoot,
    createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient)
    .withProjectKey({ projectKey: config.projectKey });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
const getProject = () => {
    return apiRoot
        .get()
        .execute();
};



