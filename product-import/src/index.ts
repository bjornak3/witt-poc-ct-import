import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ProductService } from './ProductService';



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Product Import Server is running' });
});


app.post('/productImport', async (req: Request, res: Response) => {
    const action = req.body;
    console.info('New action received', action);
    const productsData = req.body || null;
    const productService = new ProductService();

    // build additional resource update action
    productService.handleProductImportIncomingRequest(productsData).then(r => console.log(r));
    res.status(200).json({ actions: [] });
});


// Start the server
app.listen(port, () => {
    console.log(`Product Import Server is running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
    console.log(`Import endpoint: POST http://localhost:${port}/productImport`);
});

export default app;
