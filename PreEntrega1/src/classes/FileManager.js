import fs from 'fs';

class FileManager{
    constructor(filePath){
        this.filePath = filePath;
    }

    async getAll(){
        try {
            const data = await fs.promises.readFile(this.filePath);
            return JSON.parse(data);
        } catch (err) {
            throw err;
        }
    }

    async writeAll(data){
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    }

    async getIndex(array, id){
        try {
            const index = array.findIndex((element) => element.id === id);

            if (index === -1) {
                throw new Error('ID inválido.');
            }
        } catch (err) {
            throw err;
        }
    }
}

class ProductManager extends FileManager{
    
    async add(product) {
        try {
            const products = await this.getAll();

            product.id = products.length + 1;
            products.push(product);

            await this.writeAll(products);

        } catch (err){
            throw err;
        }
    }

    async update(productId, updatedProduct){
        try {
            const products = await this.getAll();

            const index = await this.getIndex(products, productId);

            products[index] = {...products[index], ...updatedProduct};

            await this.writeAll(products);
        } catch (err) {
            throw err;
        }
    }

    

    async delete(productId){
        try {
            const products = await this.getAll();

            const index = await this.getIndex(products, productId);

            products.splice(index, 1);

            await this.writeAll(products);
        } catch (err) {
            throw err;
        }
    }
}

class CartManager extends FileManager {
    async getCartIndex(cartArray, cartId){
        const cart = cartArray.find((cart) => cart.id === cartId);
        if (!cart){
            throw new Error('No se encontró el carrito.');
        }
    }

    async addProduct(cartId, productId) {
        try {
            const carts = await this.getAll();

            const cart = await this.getCartIndex(carts, cartId);

            cart.products.push(productId);

            await this.writeAll(carts);
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const carts = await this.getAll();

            const cart = await this.getCartIndex(carts, cartId);
            
            const index = await this.getIndex(cart.products, productId);

            cart.products.splice(index, 1);
            await this.writeAll(carts);
        } catch (err) {
            throw err;
        }
    }
}

export { ProductManager, CartManager, FileManager};