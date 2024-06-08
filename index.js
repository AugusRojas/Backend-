import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './rutas.js'
import app from './app.js'

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/api', router)

app.listen(app.get('port'), () => {
    console.log(`Escuchando puerto ${app.get('port')}`)
})


