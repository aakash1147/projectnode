const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/personal', (err, db) => {
    if(err) console.log(err);
    else console.log('Successfully Connect to dataBase');
})

module.exports = {
    mongoose
}
