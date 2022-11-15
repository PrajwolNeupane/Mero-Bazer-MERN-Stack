import Order from '../Model/OrderModel.js';
import express from 'express';


const router = express.Router();

router.post("/getOrder", async (req, res) => {

    if (!req.body.owner) {
        return res.send({ message: "User ID empty" });
    }


    try {
        let order = await Order.find({ owner: req.body.owner }).select('-__v').sort({date:-1})
        res.send(order);
    } catch (e) {
        res.send({ message: e });
    }

});

router.post("/addOrder", async (req, res) => {

    try {
        let order = Order(req.body);
        order = await order.save();
        res.send(order);
    } catch (e) {
        res.send({ message: e });
    }

})


export default router;