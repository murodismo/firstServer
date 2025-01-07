const { read_file, write_file } = require("../api/api")
const { v4 } = require("uuid")

const productsGet = async (req, res, next) => {
    try {
        const data = read_file("products.json")
        res.json(data)
    } catch (error) {
        next(error)
    }
}

const productsGet_one = async (req, res, next) => {
    try {
        const data = read_file("products.json")
        const { productId } = req.params

        const foundedData = data.find(item => item.id == productId)

        if (!foundedData) {
            return res.json({
                message: "data not found"
            })
        }
        res.json(foundedData)
    } catch (error) {
        next(error)
    }
}


const addProduct = async (req, res, next) => {
    try {
        const auth = read_file("auth.json")
        const data = read_file("products.json")
        const { id } = req.params
        const newData = req.body

        
        const foundedUser = auth.find(item => item.id == id)

        if (!foundedUser) {
            return res.status(404).json({
                message: "siz ro'yhatdan otmagansiz"
            })
        }

        data.push({
            id: v4(),
            ...newData
        })
        write_file("products.json", data)
        res.json({
            message: "Successfuly added"
        })
    } catch (error) {
        next(error)
    }
}

const editProduct = async (req, res, next) => {
    try{
        const data = read_file("products.json")
    const { id, productId } = req.params
    const { name, desc, price, image } = req.body

    const foundedData = data.find(item => item.id == productId)

    if (!foundedData) {
        return res.status(404).json({
            message: "data not found"
        })
    }

    data.forEach((item) => {
        if (item.id == productId) {
            item.name = name ? name : item.name
            item.desc = desc ? desc : item.desc
            item.price = price ? price : item.price
            item.image = image ? image : item.image
        }
    })

    write_file("products.json", data)
    res.json({
        message: "Success"
    })
    }catch(error){
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try{
        const authData = read_file("auth.json")
    const data = read_file("products.json")
    const { id, productId } = req.params

    const foundedUser = authData.find(item => item.id == id)

    if (!foundedUser) {
        return res.status(404).json({
            message: "You are not registered"
        })
    }

    const foundedData = data.find(item => item.id == productId)

    if (!foundedData) {
        return res.status(404).json({
            message: "Product already deleted"
        })
    }

    data.forEach((item, idx) => {
        if (item.id == productId) {
            data.splice(idx, 1)
        }
    })

    write_file("products.json", data)
    res.status(201).json({
        message: "Successfuly deleted"
    })
    }catch(error){
        next(error)
    }
}


const buyProduct = async (req, res, next) => {
    try{
        const { id, productId } = req.params;
    const users = read_file("auth.json");
    const products = read_file("products.json");

    const user = users.find(user => user.id === id);
    const product = products.find(product => product.id === productId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (!user.purchases) {
        user.purchases = [];
    }

    user.purchases.push(product);
    write_file("auth.json", users);

    res.json({ message: "Purchase successful" });
    }catch(error){
        next(error)
    }
}


module.exports = {
    productsGet,
    productsGet_one,
    addProduct,
    editProduct,
    deleteProduct,
    buyProduct
}
