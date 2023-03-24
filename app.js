import express from 'express';
import morgan from  'morgan';
import dotenv from 'dotenv';
import pkg from 'pg';
const {Client} = pkg;
import path from 'path';

import { database } from './keys.js';
const cadenaConeccion = 'postgresql//postgres@127.0.0.1:5433/postgres';

// Inicializacion
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
dotenv.config({path: './.env'});

// Middlewares
app.use(morgan('dev'));

// Conectando
const cliente = new Client ({database});
const conecta = new Client ({cadenaConeccion});

const coneccion = async () => {
    try {
        await cliente.connect
        console.log('DB Conectada!')
    } catch (error) {
        console.log('Error: ', error);
    }
} 

coneccion();

const segundaConect = async () => {
    try {
        await conecta.connect
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
            console.log('Respuesta ', resp);
        }
        cliente.end;
    });
    conecta.query("SELECT NOW()", (err, resp) =>{
        console.log(err, resp);
        conecta.end;
    });
    res.send('Corriendo')
});


// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Corriendo Servidor en puerto : ',app.get('port'));
});