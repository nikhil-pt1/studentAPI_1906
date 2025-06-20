const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const Student = require("../models/student.model");

// GET api to get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET api to get a student by id
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ error: "Invalid student ID" });
  }
});

// POST api to create a new student
router.post("/student", [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Minimum length required is 3")
    .matches(/^[A-Z][a-zA-Z\s]*$/).withMessage("Name must start with a capital letter and contain only letters and spaces")
    .trim(),

  body("address")
    .notEmpty().withMessage("Address is required")
    .isLength({ min: 5 }).withMessage("Minimum length required is 5")
    .isLength({ max: 200 }).withMessage("Maximum length allowed is 200")
    .matches(/^[A-Za-z0-9\s,.\-]+$/).withMessage("Address contains invalid characters")
    .trim(),

  
  body("Phone")
  .notEmpty().withMessage("Phone is required")
  .isLength({ min: 10, max: 10 }).withMessage("Phone must be exactly 10 digits")
  .matches(/^\d+$/).withMessage("Only numbers are allowed in phone number")
  .matches(/^[6-9]\d{9}$/).withMessage("Phone must start with digits between 6-9")
], async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty() === false) {
    return res.status(400).json({
      errors: errors.array().map(err => err.msg)
    });
  }

  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    // Handle duplicate phone number error
    if (err.code === 11000) {
      return res.status(409).json({ error: "Phone number already exists" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT api to update existing student by id
router.put("/:id", [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Minimum length required is 3")
    .matches(/^[A-Z][a-zA-Z\s]*$/).withMessage("Name must start with a capital letter and contain only letters and spaces")
    .trim(),

  body("address")
    .notEmpty().withMessage("Address is required")
    .isLength({ min: 5 }).withMessage("Minimum length required is 5")
    .isLength({ max: 200 }).withMessage("Maximum length allowed is 200")
    .matches(/^[A-Za-z0-9\s,.\-]+$/).withMessage("Address contains invalid characters")
    .trim(),

  body('Phone')
  .notEmpty().withMessage("Phone is required")
  .isLength({ min: 10, max: 10 }).withMessage("Phone must be exactly 10 digits")
  .matches(/^\d+$/).withMessage("Only numbers are allowed in phone number")
  .matches(/^[6-9]\d{9}$/).withMessage("Phone must start with digits between 6-9")

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => err.msg)
    });
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (err) {
    // Duplicate phone number error check
    if (err.code === 11000) {
      return res.status(409).json({ error: "Phone number already exists" });
    }
    res.status(400).json({ error: "Invalid student ID" });
  }
});

// DELETE api to delete student by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ error: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid student ID" });
  }
});

module.exports = router;
