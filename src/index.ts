import  { apiRoot } from './ClientApi';

function main(): void {
    console.log("Witt POC Import Adapter");

    // Retrieve Project information and output the result to the log
    apiRoot
        .get()
        .execute()
        .then(console.log)
        .catch(console.error);
}

main();
