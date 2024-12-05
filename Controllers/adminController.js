const pool = require('../db')

class AdminController {

    //создание продуктов
    async createProduct(req, res) {
        const {name, description, price} = req.body;
        try {
            const product = await pool.query(`INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *`, [name, description, price]);
            res.json(product.rows);
        } catch (error) {
            console.log('error', error)
        }
    }

    //удаление продуктов
    async deleteProduct(req, res) {
        const product_id = req.params.product_id;
        const product = await pool.query(`DELETE FROM products WHERE id = $1`, [product_id])
        res.json(product.rows[0]);
    }

    //просмротр заказов всех пользователей
    async getAllOrders(req, res) {
        try {
            const orders = await pool.query(`SELECT * FROM orders`)
            res.json(orders.rows)
        } catch (error) {
            console.log(error)
        }
    }

    //изменение статуса заказа пользователя
    async changeStatus(req, res) {
        const order_id = req.params.order_id;
        const { status } = req.body;
        try {
            const order_status = await pool.query(`UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`, [status, order_id]);
            res.json(order_status.rows);
        } catch (error) {
            console.log('error', error)
        }
    }
}

module.exports = new AdminController();