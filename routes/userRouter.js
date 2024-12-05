const Router = require('express')
const router = new Router()
const userController = require('../Controllers/userController')

router.get('/product', userController.getAllProducts)
router.post('/cart/:product_id/:quantity', userController.addProduct)
router.get('/cart', userController.ShoppingCart)
router.delete('/cart/:product_id', userController.deleteProduct)
router.post('/cart/order', userController.placeAnOrder)
router.get('/orders', userController.getAllOrders)
router.get('/status/:order_id', userController.Status)

module.exports = router