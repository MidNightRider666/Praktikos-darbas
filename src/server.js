const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const BillRoutes = require('.//routes/BillsRoute')
const accRoutes = require('./routes/accRoutes')

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(express.json());



app.use('/auth/', userRoutes);
app.use('/', BillRoutes);
app.use('/', accRoutes)



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
