const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://root:hMliWR2NzpEXuv8R@cluster.fmt0m.mongodb.net/express-testing?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = { connect }