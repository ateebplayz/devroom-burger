import jwt from 'jsonwebtoken'
import express from 'express';
import cors from 'cors';
import { collections } from './modules/mongo';
import { Product } from './schemas/product';
function generateId() {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  for (let i = 0; i < 2; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  id += '-';

  for (let i = 0; i < 3; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  id += '-';

  for (let i = 0; i < 3; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return id;
}

const app = express();

app.use(cors());
app.use(express.json())

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

app.get('/api/orders/get', async(req, res)=> {
    const token = req.query.token
    if(token) {
      try {
        const decodedToken = jwt.verify(token as string, process.env.jwtKey || '') as {username: string, password: string}
        if(decodedToken) {
          const user = await collections.admin.findOne({username: decodedToken.username, password: decodedToken.password})
          if(user) {
            const orders = await collections.orders.find().toArray()
            return res.json({data: orders, status: 200})
          } else {
            return res.json({error: 'Not Authorized', code: 401})
          }
        } else {
          return res.json({error: 'Not Found', code: 404})
        }
      } catch {}
    } else {
      return res.json({error: 'Token not found', code: 404})
    }
})

app.post('/api/orders/create', async(req, res) => {
  const data = req.body
  const orderData = data.order as Array<Product>
  try {
      if(!orderData) {
          return res.json({error: 'No order found', code: 404})
      } else {
        
          await collections.orders.insertOne({id: generateId(), order: orderData, date: Date.now()})
          return res.json({data: 'Success', code: 200})
      }
  } catch {console.log}
})
app.post('/api/orders/delete', async(req, res) => {
  const token = req.query.token
  const productId = req.query.productId
  try {
      if(!token || !productId) {
          return res.json({error: 'No Product ID / Token found', code: 404})
      } else {
          collections.orders.deleteOne({id: productId})
          return res.json({data: 'Success', code: 200})
      }
  } catch {console.log}
})

// Handle GET request to /api/admin/get
app.get('/api/admin/get', async (req, res) => {
  const username = req.query.username
  const password = req.query.password
  try {
    const user = await collections.admin.findOne({username: username, password: password})
    if(user) {
      return res.json({
        token: jwt.sign(user, process.env.jwtKey || ''),
        code: 200,
      })
    } else {
      return res.json({
        error: 'No username or password found',
        code: 404
      })
    }
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(8080, () => {
  console.log('App listening on Port 8080');
});