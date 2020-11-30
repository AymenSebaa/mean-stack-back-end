const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, 
    {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
  }, 
  (err)=>{
    if(err){
        console.log('MongoDB connection Faild', JSON.stringify(err, undefined, 2));
    } else {
        console.log('MongoDB connection successed.')
    }
}); 

require('./user');
require('./employees');
require('./product');