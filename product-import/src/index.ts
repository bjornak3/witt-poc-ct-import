import {importProducts} from "./ProductImport";

function main(): void {
    console.log("Witt POC Import Adapter");

    // Retrieve Project information and output the result to the log

    importProducts().then(result => console.log(result));

}

main();
