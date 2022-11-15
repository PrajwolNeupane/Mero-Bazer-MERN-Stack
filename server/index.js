import express from 'express';
import DBConnection from './Model/index.js';
import productRoute from './Route/productRoutes.js';
import userRoute from './Route/userRoute.js';
import cartRoute from './Route/cartRoutes.js';
import orderRoute from './Route/orderRoutes.js';
import cors from 'cors';
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors({
    origin: "*"
}));


app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })
}

app.listen(process.env.PORT || 8000, async () => {
    console.log("Server Started");
    try {
        await DBConnection;
    } catch (e) {
        console.log(e);
    }
})