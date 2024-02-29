import express from 'express';
import cors from 'cors';
import { collections } from './modules/mongo';
import { Product } from './schemas/product';

const app = express();

app.use(cors());

let products: Array<Product> = []

const fetchProducts = async () => {
    try {
        products = await collections.products.find().toArray();
        console.log('Fetched Products');
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        // Fetch products again after 10 seconds
        setTimeout(fetchProducts, 10000);
    }
};

// Initial call to fetchProducts
fetchProducts();
setTimeout(() => {fetchProducts(); console.log('Fetched Products')}, 10000)
app.get('/api/products/get', async (req, res) => {
  try {
    return res.json({
        data: products,
        code: 200,
    })
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle GET request to /api/admin/get
app.get('/api/admin/get', async (req, res) => {
  try {
    // Add logic here to fetch admin data
    // Example:
    // const adminData = await Admin.findOne();
    // res.json(adminData);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(8080, () => {
  console.log('App listening on Port 8080');
});