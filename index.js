const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyParser = require("body-parser")
const authRouter = require("./router/auth.routes")
const productsRouter = require("./router/product.routes")
const errorHandler = require("./error_handling/errorHanlding")

const app = express()

app.use(cors())
app.use(bodyParser())

app.use(authRouter)
app.use(productsRouter)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("server is running " + PORT);
})