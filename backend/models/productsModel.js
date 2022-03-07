import mongoose from "mongoose";

const productSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, 'field name is required'],
            minlength: 3,
            maxlength: 100
        },
        price: {
            type: Number,
            required: [true, 'field price is required'],
            min: 0,
            max: 100000000000
        },
        stock: {
            type: Number,
            min: 0,
            default: 0
        },
        status: {
            type: Boolean,
            default: true
        }
    },{
    versionKey: false
})
const Product = mongoose.model('Product', productSchema);
export default Product;
