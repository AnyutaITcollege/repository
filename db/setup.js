const pool = require('./index')

async function createTables(pool) {
    try {

        //SQL-запросы для создания таблиц
        const createUserTable = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) unique NOT NULL,
                password VARCHAR(100) NOT NULL,
                status VARCHAR(50) NOT NULL
            )
        `;

        const createProductTable = `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                price DECIMAL(8,2) NOT NULL,
                weight DECIMAL(2),
                description VARCHAR(255),
                nutritional_value_100g VARCHAR(255),
                composition VARCHAR(5000),
                shelf_life VARCHAR(100),
                storage_conditions VARCHAR(500),
                brand_id INT,
                category_id INT,
                img_link VARCHAR(255),
                FOREIGN KEY (brand_id) REFERENCES brand(id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (category_id) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE
            )
        `;

        const createManufacturerTable = `
            CREATE TABLE IF NOT EXISTS manufacturer (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) unique NOT NULL
            );

            INSERT INTO manufacturer(name) VALUES
                ('ГК "Русагро"'),
                ('ООО "Экатерра"'),
                ('ЗАО "Ферреро Руссия"'),
                ('Яковлевская чаеразвесочная фабрика'),
                ('ООО "Ашан"')
            ON CONFLICT DO NOTHING;
        `;
        const createBrandTable = `
            CREATE TABLE IF NOT EXISTS brand (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) unique NOT NULL,
                logo_img_link VARCHAR(255),
                manufacturer_id INT NOT NULL,
                FOREIGN KEY (manufacturer_id) REFERENCES manufacturer(id) ON UPDATE CASCADE ON DELETE CASCADE
            );

            INSERT INTO brand(name, manufacturer_id) VALUES
                ('Lipton', 2),
                ('nutella', 3),
                ('AKBAR', 4),
                ('Каждый день', 5)
            ON CONFLICT DO NOTHING;
        `;
        const createCategoryTable = `
            CREATE TABLE IF NOT EXISTS category (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) unique NOT NULL
            );

            INSERT INTO category(name) VALUES
                ('Мясо и мясные продукты'),
                ('Рыба и морепродукты'),
                ('Яйца'),
                ('Молочные продукты'),
                ('Овощи и зелень'),
                ('Фрукты'),
                ('Зерновые и крупы'),
                ('Жиры и масла'),
                ('Сладкое и десерты'),
                ('Напитки'),
                ('Орехи и семена'),
                ('Специи, приправы'),
                ('Консервы и замороженные продукты'),
                ('Готовая еда')
            ON CONFLICT DO NOTHING;
        `;

        const createShoppingCartTable = `
            CREATE TABLE IF NOT EXISTS shopping_cart (
                id SERIAL PRIMARY KEY,
                user_id INT,
                product_id INT,
                name VARCHAR(100) NOT NULL,
                price DECIMAL(8,2) NOT NULL,
                weight DECIMAL(2),
                quantity INT NOT NULL,
                img_link VARCHAR(255),
                FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
            )
        `;

        const createOrderTable = `
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                user_id INT,
                product_id INT,
                name VARCHAR(100) NOT NULL,
                price DECIMAL(8,2) NOT NULL,
                weight DECIMAL(2),
                quantity INT NOT NULL,
                made_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(100),
                FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
            )
        `;

        // выполнение запросов
        await pool.query(createUserTable);
        console.log('Users table created.');

        await pool.query(createManufacturerTable);
        console.log('Manufacturer table created.');

        await pool.query(createBrandTable);
        console.log('Brand table created.');

        await pool.query(createCategoryTable);
        console.log('Category table created.');

        await pool.query(createProductTable);
        console.log('Products table created.');

        await pool.query(createShoppingCartTable);
        console.log('ShoppingCart table created.');

        await pool.query(createOrderTable);
        console.log('Orders table created.');

    } catch (error) {
        console.error('Error creating tables:', error.message);
    }
}

module.exports = createTables;