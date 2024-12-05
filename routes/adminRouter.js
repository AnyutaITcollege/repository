const Router = require('express')
const router = new Router()
const adminController = require('../Controllers/adminController')

router.post('/product', adminController.createProduct)
router.delete('/product/:product_id', adminController.deleteProduct)
router.get('/orders', adminController.getAllOrders)
router.put('/status/:order_id', adminController.changeStatus)

module.exports = router