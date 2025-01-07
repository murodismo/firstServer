const {Router} = require("express")
const verifyAdmin = require("../middleware/adminVerify")
const { productsGet, productsGet_one, editProduct, deleteProduct, addProduct, buyProduct } = require("../controller/product.controller")

const productsRouter = Router()

productsRouter.get("/products", productsGet)
productsRouter.get("/products/:productId", productsGet_one)
productsRouter.put("/editOne/:id/:productId",verifyAdmin, editProduct)
productsRouter.delete("/delete/:id/:productId",verifyAdmin, deleteProduct)
productsRouter.post("/addProduct/:id", verifyAdmin, addProduct),
productsRouter.post("/buy/:id/:productId", buyProduct)


module.exports = productsRouter