const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router();


// Router1 Fetching all notes of the loggid in user 
router.get('/allnotes',fetchuser, async (req, res)=>{
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
});


// Router2 Adding notes 
router.post('/addnote', fetchuser, [
    // Initializing validatiors 
    body('title', 'First enter the title').exists(),
    body('description', 'First enter the description').exists()
],async (req, res)=>{
    // If error occured this this shows error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    try {
        // Adding notes to the database 
        const { title, description } = req.body;
        const notes = new Notes({
            user: req.user.id,
            title,
            description
        });
        notes.save();
        res.send(notes);
    } catch (err) {
        res.status(401).send({error: "Error occured"})
    }
});


// Router3 For updating the existig note for loggid in user
router.put('/updatenote/:id', fetchuser, [
    // Inititalizing validation
], async (req, res)=>{
    // If error occured this this shows error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const {title, description} = req.body;

    const newNote = {};
    if(title){
        newNote.title = title;
    };
    if(description){
        newNote.description = description;
    };

    let noteUpdate = await Notes.findById(req.params.id);
    if(!noteUpdate){
        return res.status(401).send({err: "Update errror"});
    };

    // Checking weather the user is not a hacker
    if(noteUpdate.user.toString() !== req.user.id){
        return res.statud(401).send({err: "You are hacker"});
    };
    
    noteUpdate = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.send(noteUpdate);
});


// Router4 Deleting notes for loggid in uer
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    let deleteNote = await Notes.findById(req.params.id);
    if(!deleteNote){
        res.status(401).send({err: "Error on Deletenote"});
    };

    if(deleteNote.user.toString() !== req.user.id){
        res.status(401).send({err: "You are hacker"});
    };

    deleteNote = await Notes.findByIdAndDelete(req.params.id);
    if(deleteNote){
        res.send({Note: "Deleted Successfully"});
    };
})

module.exports = router;