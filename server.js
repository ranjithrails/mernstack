const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');
const app = express();

app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

//connect to Mongo
mongoose.connect(db)
.then(()=>console.log("Mongo db connected"))
.catch(err => console.log(err));

//Use routes
app.use('/api/items',items);

//serve staic assets if in production

if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build','index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`server started on port ${port}`));
