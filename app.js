import express from 'express';
import morgan from  'morgan';
import dotenv from 'dotenv';
import pkg from 'pg';
const {Pool} = pkg;

import { database } from './keys.js';
const cadenaConeccion = "postgres//postgres:'Rjbm2310'@127.0.0.1:5432/music_always";

// Inicializacion
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
dotenv.config({path: './.env'});

// Middlewares
app.use(morgan('dev'));

// Conectando
const cliente = new Pool ({
    host: "localhost",
    user: "postgres",
    database:  "postgres",
    password: "Rjbm2310",
    port : 5432
});

const conecta = new Pool ({cadenaConeccion});

const coneccion = async () => {
    try {
        await cliente.connect()
        console.log('DB Conectada!')
    } catch (error) {
        console.log('Error: ', error);
    }
} 

coneccion();

const segundaConect = async () => {
    try {
        await conecta.connect()
        console.log('DB Conectada por string!')
    } catch (error) {
        console.log('Error: ', error);
    }
} 

segundaConect();

app.get('/', (req, res) => {
    cliente.query("SELECT NOW()", (err, resp) =>{
        if(err){
            console.log(err)
        }else{
            console.log('Respuesta ', resp.rows[0]);
        }
        cliente.end();
    });
    conecta.query("SELECT NOW()", (err, resp) =>{
        console.log(err, resp.rows[0]);
        conecta.end();
    });
    res.send('Corriendo')
});


// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Corriendo Servidor en puerto : ',app.get('port'));
});