// EXPRESS - LEVANTAR SERVIDOR E CRIAR ROTAS HTTP

// criar do "app" express 
const express = require('express')
const app = express()

// configurações do express
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// levantar servidor
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Servidor levantado na porta " + port)
})


// BANCO DE DADOS - MONGO DB