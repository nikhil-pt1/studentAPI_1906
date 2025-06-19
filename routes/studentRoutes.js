const express = require('express');
const router = express.Router();

const Student = require('../models/studentModel');

// GET api to see all students data 
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET api to see students data by their id
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Not Found" });
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST api  to create students 
router.post("/student", async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT api to change students data
router.put("/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//DELETE api to delete students data
router.delete("/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
