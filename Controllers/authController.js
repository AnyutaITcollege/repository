const pool = require('../db')

class AuthController {

    //регистрация пользователя
    async registrationUser(req, res) {
        const {name, email, password, status} = req.body;
        try {
            if (status == 'user' || status == 'admin') {
                const user = await pool.query(`INSERT INTO users (name, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *`, [name, email, password, status])
                res.json({message: `${status} is registered`, user_information: user.rows})
            }
            else res.json({message: "Invalid name in status. Change to 'user' or 'admin'"})
        } catch (error) {
            console.log(error)
        }
    }

    //вход
    async loginUser(req, res) {
        const {email, password} = req.body;
        try {
            const search = await pool.query(`SELECT name, password FROM users WHERE email = $1`, [email])
            const user = search.rows[0];
            if (user) {
                if (password == user.password) {
                    res.json({message: `Successful login. Welcome, ${user.name}`})
                }
                else  res.json({message: "Password is incorrect"})
            }
            else res.json({message: "User not found"})
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new AuthController();