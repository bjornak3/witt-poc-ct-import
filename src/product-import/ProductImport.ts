import {apiRoot} from '../ClientApi';
import {ProductDraft} from '@commercetools/platform-sdk';
import * as fs from 'fs';

const productAsJson = JSON.parse(
    fs.readFileSync('src/product-import/product.json', 'utf-8')
) as ProductDraft

export const importProducts = async () => {
    try {

        console.log('importing product: ', productAsJson);

            const response = await apiRoot
                .products()
                .post(
                    {
                        body: productAsJson
                    }
                )
                .execute();

            console.log('Products imported:', response.body);
            return response.body;


    }
    catch (error) {
        console.log('Error importing products:', error);
        return error;
    }
};


const queryProductByKey = (key: string) => {
    return apiRoot
        .products()
        .withKey({ key: key })
        .get()
        .execute();
};


