import mongo, { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { Product } from '../schemas/product'
dotenv.config()

export const mongoClient = new MongoClient(process.env.mongoUri || '')

export const mongoDb = mongoClient.db('Big_Belly_Burger')

export const collections = {
    products: mongoDb.collection<Product>('Products')
}