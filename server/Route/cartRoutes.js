import express from 'express';
import Cart from '../Model/CartModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const router = express.Router();


router.post("/", async (req, res) => {

    try {
        if (req.body.owner) {
            const decode = jwt.verify(req.body.owner, process.env.JWT_CODE);
            let cart = await Cart.findOne({ owner: decode.id }).select("-__v");
            res.send({ cart: cart === null ? { item: [] } : cart });
        } else {
            res.send({ message: "Provide token" });
        }

    } catch (e) {
        res.send({ message: e });
    }

})

router.post("/add", async (req, res) => {

    let cart = null;
    const decode = jwt.verify(req.body.owner, process.env.JWT_CODE);

    try {
        cart = await Cart.findOne({ owner: decode.id });
        if (!cart) {
            cart = new Cart({ owner: decode.id, item: [req.body.item] });
            cart = await cart.save();
            res.send({ cart: cart === null ? { item: [] } : cart });
        } else {
            cart = await Cart.findOneAndUpdate(
                { owner: decode.id },
                { $push: { item: req.body.item } }
            );
            res.send({ cart: cart === null ? { item: [] } : cart });
        }

    } catch (e) {
        res.send({ message: e });
    }

});

router.post("/delete", async (req, res) => {

    let cart = null;
    const decode = jwt.verify(req.body.owner, process.env.JWT_CODE);

    try {
        cart = await Cart.findOne({ owner: decode.id });
        if (cart) {
            cart = await Cart.findOneAndDelete({ owner: decode.id });
            res.send(cart);
        } else {
            res.send({ message: "Cart Item Empty" });
        }

    } catch (e) {
        res.send({ message: e });
    }

});

router.post("/delete/:id", async (req, res) => {

    let cart = null;
    const { id } = req.params;
    let index = -1;
    const decode = jwt.verify(req.body.owner, process.env.JWT_CODE);

    try {
        cart = await Cart.findOne({ owner: decode.id });
        if (cart) {
            cart = cart.item;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i]._id === id) {
                    index = i
                }
            }
            if (index > -1) {
                cart.splice(index, 1);
            }
            cart = await Cart.findOneAndUpdate({ owner: decode.id }, { $set: { item: cart } });
            res.send(cart);

        } else {
            res.send({ message: "Cart Item is empty" });
        }

    } catch (e) {
        res.send({ message: e });
    }

});


export default router;