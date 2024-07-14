// const mongoose = require("mongoose")


// const connection = mongoose.connect(process.env.mongo_url)


// module.exports = {
//     connection
// }
const mongoose = require('mongoose');

mongoose.set('strictQuery', true); // or false based on your preference

const connection = mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    connection
};
