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

//the edit request still wrong
// app.patch('/edit/:id', async (req, res) => {
//     const id = req.params.id
//     const name = req.body.editName
//     const price = req.body.editPrice
//     const stock = req.body.editStock
//     const status = req.body.editStatus

//     try {
//         await Product.findById(id, (err, updateProduct) => {
//             updateProduct.name = name;
//             updateProduct.price = price;
//             updateProduct.stock = stock;
//             updateProduct.status = status;
//             updateProduct.save();
//             res.json(updateProduct);
//         })
//     } catch (error) {
//         res.json({ message: error.message })
//     }
// })
    
// app.patch('edit/:id', async () => {
//     await Product.findByIdAndUpdate(req.params.id, req.body, {new: true},
//         (err, docs) => {
//             try {
//                 // res.json(req.body);
//                 res.json(docs);
//             } catch (error) {
//                 res.json({ message: err.message })
//             }
//         }
//     )
// })

// app.patch('edit/:id', async () => {
//     await Product.findByIdAndUpdate(req.params.id, req.body, {new: true},
//     function (err, docs) {
//         if (err){
//             console.log(err)
//         }
//         else{
//             console.log("Updated User : ", docs);
//         }
//     })
// })

// app.patch('edit/:id', async () => {
//     let doc = await Character.findOneAndUpdate({"_id": req.params.id}, req.body, {
//         returnOriginal: false
//     });
// })


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







