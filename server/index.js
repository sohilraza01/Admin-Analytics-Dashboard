const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const clientRoutes = require('./routes/client.js');
const generalRoutes = require('./routes/general.js');
const managementRoutes = require('./routes/management.js');
const salesRoutes = require('./routes/sales.js');
const AffiliateStat = require('./models/AffiliateStat.js');

// data imports
const User = require('./models/User.js');
const Product = require('./models/Products.js');
const ProductStat = require('./models/ProductStat.js');
const Transaction = require('./models/Transaction.js');
const OverallStat = require('./models/OverallStats.js');
const {dataUser,dataProduct, dataProductStat, dataTransaction,dataOverallStat, dataAffiliateStat} = require('./data/index.js');

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

//ROUTES
 app.use('/client', clientRoutes);
 app.use('/general', generalRoutes);
 app.use('/management',managementRoutes);
 app.use('/sales',salesRoutes);

//  MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port Started at : ${PORT}`));
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
    User.countDocuments()
      .then(count => {
        if (count === 0) {
          const sanitizedDataUser = dataUser.map(({ _id, ...rest }) => rest);
          return User.insertMany(sanitizedDataUser);
        } else {
          console.log('Data already exists, skipping insertion');
        }
      })
      .then(() => console.log('Data insertion completed'))
      .catch(error => {
        console.error(`Error inserting data: ${error.message}`);
      });
  })
  .catch(err => {
    console.error(`Error did not connect: ${err.message}`);
    process.exit(1); 
  });
