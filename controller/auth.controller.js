const bcrypt = require('bcryptjs');  
const { read_file, write_file } = require("../api/api");
const { v4 } = require("uuid");

const register = async (req, res, next) => {
    try {
        const data = read_file("auth.json");
        const newData = req.body;

        const foundedData = data.find(item => item.email === newData.email);

        if (foundedData) {
            return res.json({
                message: "Already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(newData.password, 10);

        data.push({
            id: v4(),
            ...newData,
            password: hashedPassword, 
            role: "user",
            purchases: []
        });

        write_file("auth.json", data);
        res.status(200).json({
            message: "Successfully registered"
        });
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try{
        const newData = req.body;
    const data = read_file("auth.json");

    const foundedData = data.find(item => item.email === newData.email);

    if (!foundedData) {
        return res.status(403).json({
            message: "You are not registered"
        });
    }

    const isPasswordValid = await bcrypt.compare(newData.password, foundedData.password);

    if (isPasswordValid) {
        return res.json({
            message: "Success"
        }); 
    }

    res.status(400).json({
        message: "Invalid password"
    });
    }catch(error){
        next(error)
    }
};

module.exports = {
    register,
    login
}
