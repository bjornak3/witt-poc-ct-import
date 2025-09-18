import {importProducts} from "./ProductImport";
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/productImport', async (req: Request, res: Response) => {
    const action = req.body;
    console.info('New action received', action);


    // build additional resource update action
    importProducts().then(result => console.log(result));
    res.status(200).json({ actions: [] });
});

function main(): void {
    console.log("Witt POC Import Adapter");
}

main();
