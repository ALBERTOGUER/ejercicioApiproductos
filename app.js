import express from 'express'
import http from 'http'
import productsList from './online_store/products'
import productsRoutes from './online_store/productsRoutes'
import bodyParser from 'body-parser'


const APP = express();
const PRODUCTS = express();
let total = 0;
APP.use(bodyParser.json());
APP.use('/products', PRODUCTS)

const SERVER = http.createServer(APP)

productsRoutes(PRODUCTS, productsList,total)

SERVER.listen(3000)