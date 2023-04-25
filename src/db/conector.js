const mongoose = require('mongoose');

// let mongoRetries = 5;
const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => console.log('yayy db connected'))
    .catch((e) => {
      console.log('db connection error===' + e)
      // if (mongoRetries > 0) {
      //   mongoRetries--;
      //   dbConnect();
      // }

    });
};


module.exports = dbConnect