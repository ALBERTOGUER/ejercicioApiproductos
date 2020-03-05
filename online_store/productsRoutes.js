import {
    v4 as uuidv4
} from 'uuid'
import products from './products';

export default (PRODUCTS, productsList, total) => {

    PRODUCTS.get('/:id', (req, res) => {
        const viewActive = Number(req.params.id) === 1;
        const activeProducts = viewActive ? productsList.filter(p => p.stock > 0) : productsList
        res.json({
            status: 'ok',
            result: activeProducts
        })
    })

    PRODUCTS.post('/new', (req, res) => {
        let uuid = uuidv4();
        console.log(req.body);
        let object = {
            "id": uuid,
            "name": req.body.name,
            "stock": req.body.stock,
            "value": req.body.value
        }
        productsList.push(object)


        res.json({
            status: 'ok',
            addedProduct: object,
            Products: productsList
        })
    })

    PRODUCTS.delete('/delete/:id', (req, res) => {

        const product = productsList.find(p => p.id === req.params.id)
        if (product) {

            productsList = productsList.filter(p => p.id !== req.params.id)

            res.json({
                status: 'ok',
                result: productsList
            })

        } else {
            //  res.json({status:'not_found',msg:'product not found'})
            res.sendStatus(404)
        }
    })

    PRODUCTS.put('/venta/:id', (req, res) => {
        const product = productsList.find(p => p.id === req.params.id)
        if (product && product.stock > 0) {
            total += product.value;
            console.log(total);

            product.stock--
            res.json({
                status: 'ok',
                result: product,
                totalGeneral: total
            })

        } else {
            //  res.json({status:'not_found',msg:'product not found'})
            res.sendStatus(404)
        }
    })

    

   



}