import express from 'express'
import bodyParser from 'body-parser'
import router from './rutas'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/api', router)

app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})


