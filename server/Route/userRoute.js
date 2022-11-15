import User from '../Model/UserModel.js';
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import checkValidUser from '../Middleware/checkValidUser.js';

const router = express.Router();

let image_name;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        image_name = Date.now() + '-store-' + Math.round(Math.random() * 10) + "-" + file.originalname.trim()
        cb(null, image_name)
    }
});

const upload = multer({ storage: storage });

router.post("/me", async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) return res.status(401).send('Acess denied. No token provided.');
        const decode = jwt.verify(token, process.env.JWT_CODE);

        if (!decode) return res.status(401).send('Acess denied. No token provided.');
        const user = await User.findById(decode.id).select('-password');
        res.send(user);

    } catch (e) {
        res.send({ message: e })
    }
});

router.get("/store", async (req, res) => {
    try {
        const store = await User.find({ isAdmin: true }).select(["-password", "-__v"]);
        res.send(store);

    } catch (e) {
        res.send({ message: e })
    }
});

router.post("/update", upload.single('image'), async (req, res) => {
    try {



        if (image_name) {
            req.body.image = "/uploads/" + image_name
        }

        const store = await User.findOneAndUpdate({ _id: req.body.id }, { $set: req.body });
        res.send(store);

    } catch (e) {
        res.send({ message: e.message })
    }
});


router.post("/login", async (req, res) => {


    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ "message": 'User not found', "code": 400 });


    try {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send({ "message": 'Invalid password', "code": 400 });
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_CODE);
        res.send({ "message": "Log In Successfully", "token": token });
    } catch (e) {
        res.send({ message: e });
    }



});

router.post("/create/store", [checkValidUser, upload.single('image')], async (req, res) => {


    req.body.image = "/uploads/" + image_name;


    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let user = new User({ ...req.body, isAdmin: true });

    try {
        user = await user.save();
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_CODE);
        res.send({
            token: token,
            message: "User Created"
        });
    } catch (e) {
        res.send({ message: e });
    }

});
router.post("/create/user", checkValidUser, async (req, res) => {




    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    let user = new User({ ...req.body, isAdmin: false });

    try {
        user = await user.save();
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_CODE);
        res.send({
            token: token,
            message: "User Created"
        });
    } catch (e) {
        res.send({ message: e });
    }

});

export default router;