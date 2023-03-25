import express from 'express';
import morgan from  'morgan';
import dotenv from 'dotenv';
import pkg from 'pg';
const {Pool, Client} = pkg;
const cadenaConeccion = 'PostgreSql//postgres:Rjbm-2310@127.0.0.1:5433/postgres';


// Inicializacion
const app = express();

// Configuración
app.set('port', process.env.PORT || 4000);
dotenv.config({path: './.env'});

// Middlewares
app.use(morgan('dev'));

// Conectando
const cliente = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
const conecta = new Client ({cadenaConeccion});

const coneccion = () => {
    try {
        cliente.connect();
        console.log('DB Conectada!')
    } catch (error) {
        console.log('Error: ', error);
    }
    
} 

coneccion();

const segundaConect = async () => {
    try {
        await conecta.connect();
        console.log('DB Conectada por string!')
    } catch (error) {
        console.log(error);
    }
} 

segundaConect();

app.get('/', (req, res) => {
    cliente.query("SELECT NOW()", (err, resp) =>{
        if(err){
            console.log(err)
        }else{
            console.log('Respuesta ', resp.rows[0]);
            console.log('Respuesta ', resp.rows[0]);
        }
        cliente.end();
        cliente.end();
    });
    conecta.query("SELECT NOW()", (err, resp) =>{
        if (!err){
            console.log(resp.rows[0]);
        }else{
            console.log(err);
        }
        conecta.end();
    });
    res.send(prueba);
});

// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Corriendo Servidor en puerto : ',app.get('port'));
});