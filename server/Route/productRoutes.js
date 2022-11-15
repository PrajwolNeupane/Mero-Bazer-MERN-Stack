import Product from '../Model/ProductModel.js';
import express from 'express';
import multer from 'multer';

const router = express.Router();

let image_name;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        image_name = Date.now() + '-product-' + Math.round(Math.random() * 10) + "-" + file.originalname.trim()
        cb(null, image_name)
    }
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {

    try {
        let product = await Product.find().select('-__v');
        res.send(product);
    } catch (e) {
        res.send({ message: e });
    }

})

router.post("/", upload.single('image'), async (req, res) => {

    let product = new Product({
        name: req.body.name,
        image: "/uploads/" + image_name,
        price: req.body.price,
        rate: req.body.rate,
        storeId: req.body.storeId,
        description: req.body.description,
        type: req.body.type
    });

    try {
        product = await product.save();
        res.send(product);
    } catch (e) {
        res.send({ message: e });
    }

});


export default router;