import {apiRoot} from './ClientApi';
import {ProductDraft} from '@commercetools/platform-sdk';
import * as fs from 'fs';


export class ProductService {

    async handleProductImportIncomingRequest(productData:any ): Promise<void> {
       if (productData.key === undefined) {
          await this.importProduct(productData);
       }else {
           this.getProductByKey(productData.key)
               .then(
                   (response) => {
                       if(response.body.key === productData.key) {
                           console.log('Product already exists, nothing to update');
                       }
                   }
               )
               .catch( error => {
                       this.importProduct(productData);
                   }
               )
       }
    }

    async getProductByKey(key: string): Promise<any> {
        return apiRoot
            .products()
            .withKey({ key: key })
            .get()
            .execute();
    }

    async updateProduct(key: string, productData: any): Promise<any> {
        return apiRoot
            .products()
            .withKey({ key: key })
            .post({
                body: productData
            })
            .execute();
    }

    async importProduct(productData: any): Promise<void> {
        try {

            if(productData === undefined || productData === null || productData.key === undefined) {
                console.log('productData is not present using the product.json file as default.');
                productData = JSON.parse(
                    fs.readFileSync('product.json', 'utf-8') ) as ProductDraft;
            }
            console.log('importing product: ', productData);

            const response = await apiRoot
                .products()
                .post(
                    {
                        body: productData
                    }
                )
                .execute();

            console.log('Products imported:', response.body);
        }
        catch (error) {
            console.log('Error importing products:', error);
        }
    }
}


