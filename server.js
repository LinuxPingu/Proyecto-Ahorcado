const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const port = 3000


/* Static Files */
app.use(express.static('Source'));
app.use('/CSS', express.static(__dirname+'/Source/CSS'));
app.use('/JS', express.static(__dirname+'/Source/JS'));
app.use('/Icos', express.static(__dirname+'/Source/Icos'));
app.use('/Images', express.static(__dirname+'/Source/Images'));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Views/ahorcado.html');
});

app.post('/index.html', function(req,res){
    
});

app.listen(port, () => {
  console.log(`Running in port: ${port}`)
});
