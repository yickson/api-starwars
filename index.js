
let mongoose = require('mongoose');
let app = require('./app');
let port = 3002;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/starwars',  {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => {
        console.log('Conexion a la base de datos correcta');
        app.listen(port, () => {
            console.log('Escuchando puerto '+port);
        });
    });