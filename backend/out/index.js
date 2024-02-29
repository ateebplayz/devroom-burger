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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = require("./modules/mongo");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
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
// Handle GET request to /api/admin/get
app.get('/api/admin/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Add logic here to fetch admin data
        // Example:
        // const adminData = await Admin.findOne();
        // res.json(adminData);
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
