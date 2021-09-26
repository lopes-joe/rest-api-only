// 1. EXPRESS - LEVANTAR SERVIDOR E CRIAR ROTAS HTTP

// a. "app" express 
const express = require('express')
const app = express()

// b. configurar do express
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// c. levantar servidor
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Servidor levantado na porta " + port)
})

// d. rotas
app.route('/songs')
    .get(getAllSongs)
    .post(postSong)
app.route('/songs/:songId')
    .get(getOneSong)
    .put(updateSong)
    .delete()


/* 2. BANCO DE DADOS - MONGO DB
*  a. esquema para persistencia
*  b. métodos para persistência
*  c. conexão com o banco de dados 
*/
// a. esquema para persistência
const mongoose = require('mongoose')
const songSchema = mongoose.Schema
songSchema = {
    title: String,
    artist: String
}
const song = mongoose.model('songSchema', songSchema)

// b. métodos para persistência
// (i). getAll
function getAllSongs(req, res){
    song.find({}, (error, songs)=>{
        if(error){
            res.send('Error: ' + error)
        } else {
            res.json(songs)
        }
    })
}
// (ii). getOne
function getOneSong(req, res){
    song.findById({'_id' : req.params.songId}, (error, aSong)=>{
        if(error){
            res.send(error)
        } else{
            res.json(aSong)
        }
    })
}
// (iii). post
function postSong(req, res){
    const newSong = mongoose.model(req.body)
    newSong.create({}, (error, sSong)=>{
        if(error){
            res.send(error)
        } else {
            res.json(sSong)
        }
    })
}
// (iv). put
function updateSong(req, res){
    song.findByIdAndUpdate({"_id" : req.params.songId}, req.body, (error, uSong)=>{
        if(error){
            res.send(error)
        } else {
            res.json(uSong)
        }
    })
}

// (v). delete
function deletSong(req, res){
    song.remove({'_id': req.params.songId}, (error, dSong)=>{
        if(error){
            res.send(error)
        } else {
            res.json({message: dSong + "foi deletado"})
        }
    })
}