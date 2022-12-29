import express from "express";
import cartRouter from "./routes/cart.router.js";
import productRouter from "./routes/product.router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static("public"));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});