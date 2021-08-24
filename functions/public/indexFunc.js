const functions = require("firebase-functions");
const express = require('express');
const app = express();
const titulo = 'valor de prueba'

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

app.get('/algo', (request, response)=>{
  
  response.send('FUNCIONANDO');  

  
});

app.get('/edit',(request,response) =>{
  //titulo=req.query.id
  /*r('dato2').then(resp=>{
      console.log('El dato es '+res)
      res.render('index', {titulo: resp.campo1});
  });*/

  response.render('editEmployee', {titulo: titulo});
  
  
});

//app.use(express.static(__dirname, '/public'));

exports.app = functions.https.onRequest(app);

