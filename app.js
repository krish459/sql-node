import express from 'express'
import {
    getNotes, getNote, createNote
} from './index.js'

const app = express()
app.use(express.json())

app.get("/notes", async(req,res)=>{
    const result = await getNotes()
    res.send(result)
})
app.get("/notes/:id", async(req,res)=>{
    const id = req.params.id
    const result = await getNote(id)
    res.sendStatus(200).send(result)
})
app.post("/create-note", async(req,res)=>{
    const {title, conents} = req.body
    const note = await createNote(title, conents)
    res.sendStatus(201).send(note)
})

app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(8080, ()=>{
    console.log(`Server is running on port 8080`);
})