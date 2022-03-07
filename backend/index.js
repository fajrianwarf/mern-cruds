import './config/mongodb.js';
import express from "express";
import Product from './models/productsModel.js';
import cors from 'cors';

// const router = express.Router();
const port = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Server running on ${port}`))


app.get('/', async (req, res) => {
    const products = await Product.find()
    try {
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
})

app.get('/:id', async (req, res) => {
    const oneProducts = await Product.find({_id: req.params.id})
    try {
        res.json(oneProducts);
    } catch (error) {
        res.json({ message: error.message });
    }
})

app.post('/tambah', async (req, res) => {
    const addName = req.body.addName;
    const addPrice = req.body.addPrice;
    const addStock = req.body.addStock;
    const addStatus = req.body.addStatus;
    
    const products = new Product({
        name: addName, 
        price: addPrice, 
        stock: addStock, 
        status: addStatus
    });

    try {
        await products.save()
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
})

app.patch('/edit/:id', async (req, res) => {
    // const id = req.params.id
    // const name = req.body.editName
    // const price = req.body.editPrice
    // const stock = req.body.editStock
    // const status = req.body.editStatus

    try {
        await Product.findByIdAndUpdate(req.params.id, req.body, {
            returnOriginal: false
        });
        res.json({ message: 'Update data success'})
    } catch (error) {
        res.json({ message: error.message })
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Product.findByIdAndRemove(id).exec();
        res.json({
            'message': `Product ${id} deleted` 
        })
    } catch (err) {
        res.json({ message: err.message })
    }
})







