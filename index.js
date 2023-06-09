
import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'


const app = express()

db.authenticate()
    .then(()=>console.log('Base de datos conectada'))
    .catch(error=>console.log(error))

//definimos  puerto
const port = process.env.PORT||4000

//Habilitar PUG
app.set('view engine','pug');

//Obtener el año actual
app.use((req,res,next)=>{
    const year = new Date()
    res.locals.ActualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    console.log(req)
    return next()
});
//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}))



//definir la carpeta Public
app.use(express.static('public'))

//agregar router
app.use('/',router)

app.listen(port,()=>{
    console.log(`el servidor esta funcionando en el puerto :${port}`)
})