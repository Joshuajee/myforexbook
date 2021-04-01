if(process.env.NODE_ENV === "production"){
    module.exports = {
        DataBaseURI: process.env.DATABASE_URI,
        Email: process.env.EMAIL,
        Password: process.env.PASSWORD
    }
}else{
    module.exports = require("./dev")
}