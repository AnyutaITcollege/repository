const pool = require('../db')

class UserController {

    //просмотр каталога продуктов
    async getAllProducts(req, res) {
        try {
            const products = await pool.query(`SELECT p.name, p.price, p.weight, p.description, p.nutritional_value_100g, p.composition, p.shelf_life, p.storage_conditions, b.name AS brand, m.name AS manufacturer FROM products p JOIN brand b ON p.brand_id = b.id JOIN manufacturer m ON b.manufacturer_id = m.id`)
            res.json(products.rows)
        } catch (error) {
            console.log(error)
        }
    }

    //добавление продукта в корзину
    async addProduct(req, res) {
        const product_id = req.params.product_id;
        const quantity = req.params.quantity;
        try {
            const product = await pool.query(`SELECT name, description, price FROM products WHERE id = $1`, [product_id]);
            const { name, description, price } = product.rows[0];
            const add_product = await pool.query(`INSERT INTO shopping_cart (product_id, name, description, price, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [product_id, name, description, price, quantity]);
            res.json(add_product.rows);
        } catch (error) {
            console.log('error', error)
        }
    }

    //удаление продукта из корзины
    async deleteProduct(req, res) {
        const product_id = req.params.product_id;
        const product = await pool.query(`DELETE FROM shopping_cart WHERE id = $1`, [product_id])
        res.json(product.rows[0]);
    }

    //просмотр корзины
    async ShoppingCart(req, res) {
        try {
            const shopping_cart = await pool.query(`SELECT * FROM shopping_cart`);
            res.json(shopping_cart.rows);
        } catch (error) {
            console.log('error', error)
        }
    }

    //оформить заказ !!!!
    async placeAnOrder(req, res) {
        try {
            await pool.query(`INSERT INTO orders(id)  RETURNING *`)
            const order = await pool.query(`INSERT INTO orders (product_name) SELECT name FROM shopping_cart RETURNING *`);
            await pool.query(`DELETE FROM shopping_cart`);
            res.json(order.rows);
        } catch (error) {
            console.error('error', error)
        }
    }

    //посмотреть заказы пользователя
    async getAllOrders(req, res) {
        try {
            const orders = await pool.query(`SELECT * FROM orders`)
            res.json(orders.rows)
        } catch (error) {
            console.log(error)
        }
    }

    //посмотреть статус выполнения заказа
    async Status(req, res) {
        const order_id = req.params.order_id;
        const status = await pool.query(`SELECT id, status FROM orders WHERE id = $1`, [order_id])
        res.json(status.rows[0]);
    }
}

module.exports = new UserController();