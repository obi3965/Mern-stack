const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv');
const cors = require('cors')


const app = express();


const routes = require('./routes/routes')




// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use(express.static(`${__dirname}/public`));

app.use(express.json());
app.use(bodyParser.urlencoded({ limit:'10mb', extended: true }))
app.use(bodyParser.json())  
app.use(cors())


dotenv.config({ path:'./config/config.env' })
try {
    mongoose.connect(process.env.DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser:true
    })
    console.log('db connected')
} catch (error) {
    console.log('db not connected')
}



app.use('/files', express.static(path.resolve(__dirname,  "files")))

app.use(routes )




    
   

const PORT = process.env.PORT
app.listen(PORT, function(){
      console.log('app is running on:' , + PORT)
})

