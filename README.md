# Product Import commercetools connector App

<!-- TOC -->
* [Product Import commercetools connector App](#product-import-commercetools-connector-app)
  * [Structure and architecture](#structure-and-architecture)
    * [connector-deploy](#connector-deploy)
    * [product-import](#product-import-)
      * [Usage](#usage)
  * [Deployment and logs](#deployment-and-logs)
    * [Components](#components)
    * [Deployment flow](#deployment-flow)
    * [Logs](#logs)
    * [Remarks](#remarks)
<!-- TOC -->
Goal of this project is to test out commerce tools connector apps via a simple typescript service that imports products in commercetools.

## Structure and architecture

### connector-deploy
Contains a bundle of HTTP requests that show examples of interacting with the Commercetools Connect API. All the endpoints that are available in the http files in this folder are also accesible from the merchant center in commercetools under "Manage Teams & Organisations / Connect / manage Connectors"

------
<b>createConnectorStaged.http</b> → provides examples of creating, updating and publishing connectors in Commercetools. ConnectorStaged are used as templates that contain the information about the connector application that will be deployed in commercetools.

<b>createConnectorDeployment.http</b> → provides examples of creating, updating and deleting deployments in Commercetools. Deployments or otherwise called installations are based on the recent version of the published connectorStaged. 
 
### product-import 
Contains a simple NodeJS application that uses the commercetools platform SDK to import products in commercetools.

#### Usage
Configure the connection to the desired commercetools project in **.env** file in the module.

The product import service exposes one endpoint which can be used to import products in commercetools. See the example below:

``` http request
POST http://localhost:3000/productImport
Content-Type: application/json

{
    "productType": {
        "typeId": "product-type",
        "id": "1b4e7db5-51a6-4761-9c00-f466cd3d4c08"
    },
    "name": {
        "en": "Sample T-Shirt 2"
    },
    "slug": {
        "en": "sample-t-shirt-2"
    },
    "description": {
        "en": "A comfortable cotton t-shirt in multiple sizes."
    },
    "key": "tshirt-2",
    "masterVariant": {
        "sku": "TSHIRT-001-1",
        "prices": [
            {
                "value": {
                    "currencyCode": "EUR",
                    "centAmount": 1999
                }
            }
        ]
    },
    "variants": [
            {
                "sku": "TSHIRT-002-2",
                "prices": [
                    {
                        "value": {
                            "currencyCode": "EUR",
                            "centAmount": 1999
                        }
                    }
                ]
            }
    ],
    "publish": true
} 
```
If the endpoint is called without a body, then a default product will be imported. You can configure this in the **product.json** file in the module.

## Deployment and logs

### Components
- connect.yaml → is needed to define the type of application that will be deployed and the environment variables needed to run the application.
- connectorStaged → is needed to define a template of how the deployment will look like. It holds reference to the git repository and the tag that the deployment will use. 
- deployment (or installation) → is the final configuration of the application that holds also the environment variables.

-----

### Deployment flow
The following graph visualizes the process of deploying a new and an existing application in Commercetools. 

``` mermaid
    A[Push code to GitHub] --> B[Tag and create a release based on the tag]

    B --> C{ConnectorStaged exists?}
    C -- Yes --> D[Update the connectorStaged]
    C -- No --> E[Create the connectorStaged]

    D --> F[Request preview of connector ] --> K[Request Publishing]
    E --> F[Request preview of connector ] 

    K --> G{Deployment exists?}
    G -- Yes --> H[Update the deployment]
    G -- No --> I[Create the deployment]

    H --> J[Deploy the application]
    I --> J[Deploy the application]
```
-----

### Logs
Logs are accessible via REST endpoints or in the merchant center. Examples of usage can be found in the [connect-deploy](#connector-deploy) module.

-----
### Remarks
- Publishing connectorStaged and deploying can take up to 10 minutes.
- updateConnector must be set to true for the deployment to use the recent version of the release otherwise the service will only be restarted but not use the recent changes in code.
- Always verify the tag that is being used by the connector and the deployment
- The application name defined in the connect file must match the name of the module in the structure. Same with the environment variables
- The URL under which the connector app is reachable can be retrieved from Commercetools merchant center