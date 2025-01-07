const fs = require("fs")

const read_file = (data) => {
    return JSON.parse(fs.readFileSync(`./module/${data}`, "utf-8"))
}

const write_file = (data, newdata) => {
    return fs.writeFileSync(`./module/${data}`, JSON.stringify(newdata, null, 4))
}
module.exports = {
    read_file,
    write_file
}