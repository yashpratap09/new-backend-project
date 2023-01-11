const express=require('express');
const mongoose = require('mongoose');
const route = require('./router/route');
const app=express();

app.use(express.json());

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://ankushrai222:Ankushrai222@newproject.tknxizt.mongodb.net/assingmentCompany?retryWrites=true&w=majority", {
    useNewUrlParser: true,
}).then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/',route);
let PORT=3000
app.listen(PORT, () => console.log(`server port is  ${PORT}`));
