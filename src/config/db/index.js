const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test_pro');
        console.log('connect successfully !!!');
        
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Lỗi kết nối đến MongoDB:'));
        db.on('disconnected', function () {
            console.log(`disconnected::: ${this.name}`);
        })

        process.on('SIGINT', async () => {
            await db.close();
            process.exit(0);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };