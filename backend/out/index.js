"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = require("./modules/mongo");
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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let products = [];
const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        products = yield mongo_1.collections.products.find().toArray();
        console.log('Fetched Products');
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
    finally {
        // Fetch products again after 10 seconds
        setTimeout(fetchProducts, 10000);
    }
});
// Initial call to fetchProducts
fetchProducts();
setTimeout(() => { fetchProducts(); console.log('Fetched Products'); }, 10000);
app.get('/api/products/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json({
            data: products,
            code: 200,
        });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('/api/orders/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    if (token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.jwtKey || '');
            if (decodedToken) {
                const user = yield mongo_1.collections.admin.findOne({ username: decodedToken.username, password: decodedToken.password });
                if (user) {
                    const orders = yield mongo_1.collections.orders.find().toArray();
                    return res.json({ data: orders, status: 200 });
                }
                else {
                    return res.json({ error: 'Not Authorized', code: 401 });
                }
            }
            else {
                return res.json({ error: 'Not Found', code: 404 });
            }
        }
        catch (_a) { }
    }
    else {
        return res.json({ error: 'Token not found', code: 404 });
    }
}));
app.post('/api/orders/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const orderData = data.order;
    try {
        if (!orderData) {
            return res.json({ error: 'No order found', code: 404 });
        }
        else {
            yield mongo_1.collections.orders.insertOne({ id: generateId(), order: orderData, date: Date.now() });
            return res.json({ data: 'Success', code: 200 });
        }
    }
    catch (_b) {
        console.log;
    }
}));
app.post('/api/orders/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const productId = req.query.productId;
    try {
        if (!token || !productId) {
            return res.json({ error: 'No Product ID / Token found', code: 404 });
        }
        else {
            mongo_1.collections.orders.deleteOne({ id: productId });
            return res.json({ data: 'Success', code: 200 });
        }
    }
    catch (_c) {
        console.log;
    }
}));
// Handle GET request to /api/admin/get
app.get('/api/admin/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.query.username;
    const password = req.query.password;
    try {
        const user = yield mongo_1.collections.admin.findOne({ username: username, password: password });
        if (user) {
            return res.json({
                token: jsonwebtoken_1.default.sign(user, process.env.jwtKey || ''),
                code: 200,
            });
        }
        else {
            return res.json({
                error: 'No username or password found',
                code: 404
            });
        }
    }
    catch (error) {
        console.error('Error fetching admin data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Start the server
app.listen(8080, () => {
    console.log('App listening on Port 8080');
});
