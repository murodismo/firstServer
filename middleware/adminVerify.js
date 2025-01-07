const {read_file} = require("../api/api")

const verifyAdmin = async(req, res, next) => {
    const data = read_file("auth.json")
    const {id} = req.params

    const foundedData = data.find(item => item.id == id)

    if (!foundedData) {
        res.status(404).json({
            message: "You are not registered"
        })
    }

    if (foundedData.role !== "admin") {
        return res.status(400).json({
            message: "You are not admin"
        })
    }

    next()
}

module.exports = verifyAdmin